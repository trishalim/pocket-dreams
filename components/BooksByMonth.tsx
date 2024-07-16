import { months } from "@/utils/months";
import UserBook from "@/components/UserBook";
import { BookShelfResponse } from "@/app/interfaces/book-shelf";

export default function BooksByMonth({ data }: { data: BookShelfResponse }) {
  if (data?.byMonth.length === 0) {
    return <div>No books read in 2024</div>;
  }

  return (
    <div className="grid gap-8">
      {data?.byMonth.map((month) => (
        <div key={month.month} className="grid gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-semibold">{months[month.month]}</h2>
            <p className="text-gray-500 text-sm">
              ({month.count} {month.count === 1 ? "book" : "books"})
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {month.user_books?.map((book) => (
              <UserBook book={book} key={book.book_id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
