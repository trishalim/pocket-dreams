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
          <Link href={`/book/${book.book_id}`} className="flex gap-1.5">
            <BookOpenIcon className="mt-0.5 text-lg shrink-0 text-gray-300" />{" "}
            <span className="line-clamp-1">{book.book.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
