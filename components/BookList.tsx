import Link from "next/link";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import { books, user_books } from "@prisma/client";

export default function BookList({
  user_books,
}: {
  user_books: Array<user_books & { book: books }>;
}) {
  return (
    <ul className="text-sm leading-relaxed flex flex-col gap-1">
      {user_books.map((book) => (
        <li key={book.book_id}>
          <Link
            href={`/book/${book.book_id}`}
            className="flex text-gray-300 gap-1.5"
          >
            <BookOpenIcon className="mt-0.5 text-lg text-gray-500" />{" "}
            {book.book.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
