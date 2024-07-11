import { months } from "@/utils/months";
import UserBook from "@/components/UserBook";
import { BookShelfResponse } from "@/app/interfaces/book-shelf";
import { user_books } from ".prisma/client";
import { books } from "@prisma/client";
import BookOpenIcon from "@/components/icons/BookOpenIcon";

export default function BooksByYear({ data }: { data: BookShelfResponse }) {
  if (data?.byMonth.length === 0) {
    return <div>No books read in 2024</div>;
  }

  const monthsWithBooks: Array<{
    monthName: string;
    user_books?: Array<user_books & { book: books }>;
    count?: number;
  }> = months.map((monthName, index) => {
    return {
      monthName,
      user_books: [],
    };
  });

  data?.byMonth.forEach((month) => {
    monthsWithBooks[month.month].user_books = month.user_books;
    monthsWithBooks[month.month].count = month.count;
  });

  return (
    <div className="grid gap-8">
      <div className="grid md:grid-cols-3 gap-3">
        {monthsWithBooks.map((month) => {
          return (
            <div
              key={month.monthName}
              className="md:aspect-square border p-3 rounded"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-lg font-semibold">{month.monthName}</h2>
                <p className="text-gray-500 text-sm">
                  ({month.count || 0} {month.count === 1 ? "book" : "books"})
                </p>
              </div>

              {month.user_books && (
                <ul className="text-sm leading-relaxed flex flex-col gap-1">
                  {month.user_books.map((book) => (
                    <li key={book.book_id} className="flex gap-1.5">
                      <BookOpenIcon className="mt-0.5 text-lg text-gray-300" />{" "}
                      {book.book.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
