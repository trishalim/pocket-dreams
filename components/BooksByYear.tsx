import { months } from "@/utils/months";
import UserBook from "@/components/UserBook";
import { BookShelfResponse } from "@/app/interfaces/book-shelf";
import { user_books } from ".prisma/client";
import { books } from "@prisma/client";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import Link from "next/link";
import BookList from "@/components/BookList";

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
              <div className="flex justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold">{month.monthName}</h2>
                {month.count && (
                  <p className="text-gray-500 text-sm">
                    {month.count} {month.count === 1 ? "book" : "books"}
                  </p>
                )}
              </div>

              {!month.count && (
                <p className="text-gray-500 text-sm">
                  No books read this month.
                </p>
              )}

              {month.user_books && <BookList user_books={month.user_books} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
