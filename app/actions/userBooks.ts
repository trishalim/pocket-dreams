"use server";

import { getUser } from "@/app/actions/user";
import { prisma } from "@/utils/prisma";
import { user_books } from ".prisma/client";
import { UserBookPayload } from "@/app/interfaces/user-book-payload";
import { books } from "@prisma/client";
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
export const removeBookFromShelf = async (id: bigint) => {
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

export const getUserBooks = async (): Promise<
  BookShelfResponse | undefined
> => {
  const user = await getUser();

  if (user) {
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
            read_at: "desc",
          },
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

    return {
      totalCount: userWithBooks.user_books.length,
      byMonth: booksByMonth.reverse(),
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
