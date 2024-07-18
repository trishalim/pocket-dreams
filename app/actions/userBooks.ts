"use server";

import { getUser } from "@/app/actions/user";
import { prisma } from "@/utils/prisma";
import { UserBookPayload } from "@/app/interfaces/user-book-payload";
import { BookShelfMonth, BookShelfResponse } from "@/app/interfaces/book-shelf";

export const addBookToShelf = async (key: string) => {
  const user = await getUser();

  if (!user) {
    console.log("User not found");
    return;
  }

  // find the book by its key
  const book = await prisma.books.findUnique({
    where: { open_library_key: key },
    select: { id: true },
  });

  if (!book) {
    console.log("Book not found");
    return;
  }

  // insert into 'user_books' table
  const userBooks = await prisma.user_books.create({
    data: {
      user_id: user.id,
      book_id: book.id,
    },
  });

  console.log("Added to shelf", book.id);
};
export const removeBookFromShelf = async (id: string) => {
  const user = await getUser();

  if (user) {
    await prisma.user_books.delete({
      where: {
        user_id_book_id: {
          book_id: id,
          user_id: user.id,
        },
      },
    });
  }
};

export const getUserBooks = async (
  year?: number,
): Promise<BookShelfResponse | undefined> => {
  const user = await getUser();

  console.log({ year });

  if (user) {
    const where = year
      ? {
          read_at: {
            gte: new Date(`1-1-${year}`),
            lte: new Date(`12-31-${year}`),
          },
        }
      : {};

    const userWithBooks = await prisma.users.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        user_books: {
          include: {
            book: true,
          },
          orderBy: {
            rating: "desc",
          },
          where,
        },
      },
    });

    const booksByMonth: BookShelfMonth[] = [];

    userWithBooks.user_books.forEach((book) => {
      const month = book.read_at.getMonth();
      const year = book.read_at.getFullYear();

      if (booksByMonth[month]?.user_books) {
        booksByMonth[month].user_books.push(book);
        booksByMonth[month].count = booksByMonth[month].count + 1;
      } else {
        booksByMonth[month] = {
          month,
          year,
          user_books: [book],
          count: 1,
        };
      }
    });

    const bestMonth = booksByMonth.slice().sort((a, b) => b.count - a.count)[0];

    return {
      totalCount: userWithBooks.user_books.length,
      favorites: userWithBooks.user_books
        .filter((book) => book.rating && book.rating > 3)
        .slice(0, 3),
      byMonth: booksByMonth.reverse(),
      bestMonth: bestMonth.month,
      bestMonthCount: bestMonth.count,
    };
  }
};

export const addUserBook = async (userBook: UserBookPayload) => {
  const user = await getUser();

  if (user) {
    return prisma.user_books.create({
      data: {
        ...userBook,
        user_id: user.id,
      },
    });
  }
};

export const updateUserBook = async (userBook: UserBookPayload) => {
  const user = await getUser();

  if (user) {
    return prisma.user_books.update({
      data: {
        ...userBook,
        user_id: user.id,
      },
      where: {
        user_id_book_id: {
          user_id: user.id,
          book_id: userBook.book_id,
        },
      },
    });
  }
};

export const getUserBook = async (bookId: string) => {
  const user = await getUser();

  if (user) {
    return prisma.user_books.findUnique({
      where: {
        user_id_book_id: {
          user_id: user.id,
          book_id: bookId,
        },
      },
      include: {
        book: true,
      },
    });
  }
};

export const getYears = async () => {
  const user = await getUser();

  if (user) {
    const result: Array<{ year: number }> = await prisma.$queryRaw`
      SELECT EXTRACT(YEAR FROM read_at) AS year
      FROM user_books
      WHERE read_at is not NULL
      GROUP BY year
      ORDER BY year DESC
    `;

    return result;
  }
};
