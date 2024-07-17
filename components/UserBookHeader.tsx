import BookCover from "@/components/BookCover";
import Rating from "@/components/Rating";
import { books, user_books } from "@prisma/client";

export default function UserBookHeader({
  book,
}: {
  book: user_books & { book: books };
}) {
  return (
    <div className="flex flex-col gap-6 items-center text-center sm:text-left sm:flex-row">
      <BookCover
        className="shadow-lg"
        book={book.book}
        width={130}
        height={200}
      ></BookCover>
      <div className="grid gap-5">
        <div>
          <h1 className="font-serif text-2xl lg:text-4xl font-bold mb-1 md:mb-3">
            {book.book.title}
          </h1>

          <p className="text-gray-500">by {book.book.author_name}</p>
        </div>

        <Rating className="text-2xl mx-auto sm:mx-0" rating={book.rating} />

        <p className="text-gray-500 text-sm">
          Read on {book.read_at.toDateString()}
        </p>
      </div>
    </div>
  );
}
