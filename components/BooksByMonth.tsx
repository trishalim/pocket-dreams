import { months } from "@/utils/months";
import UserBook from "@/components/UserBook";
import { BookShelfResponse } from "@/app/interfaces/book-shelf";

export default function BooksByMonth({ data }: { data: BookShelfResponse }) {
  if (data?.byMonth.length === 0) {
    return <div>No books read in 2024</div>;
  }

  return (
    <div className="grid gap-10">
      {data?.byMonth.map((month) => (
        <div key={month.month} className="grid gap-5">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-lg md:text-xl font-medium">
              {months[month.month]}
            </h2>
            <p className="text-gray-500 text-sm">
              ({month.count} {month.count === 1 ? "book" : "books"})
            </p>
          </div>
          <div className="grid gap-3 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {month.user_books?.map((book) => (
              <UserBook book={book} key={book.book_id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
