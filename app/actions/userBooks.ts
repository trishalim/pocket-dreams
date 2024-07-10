"use server";

import { getUser } from "@/app/actions/user";
import { prisma } from "@/utils/prisma";
import { user_books } from ".prisma/client";
import { UserBookPayload } from "@/app/interfaces/user-book-payload";

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

export const getUserBooks = async () => {
  const user = await getUser();

  console.log({ user });

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
        },
      },
    });

    return userWithBooks.user_books;
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
