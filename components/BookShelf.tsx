"use client";

import { getUserBooks } from "@/app/actions/userBooks";
import { useQuery } from "@tanstack/react-query";
import UserBook from "@/components/UserBook";
import { getUser } from "@/app/actions/user";
import { months } from "@/utils/months";

export default function BookShelf() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["user_with_books", user?.id],
    queryFn: () => {
      return getUserBooks();
    },
  });

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  console.log({ data });

  return (
    <div className="grid gap-8">
      <div className="flex items-baseline gap-3 border-b pb-2">
        <h1 className="text-2xl font-semibold">Books read in 2024</h1>
        <p className="text-gray-500 text-sm">({data?.totalCount} books)</p>
      </div>
      {data?.byMonth.map((month) => (
        <div key={month.month} className="grid gap-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-semibold">{months[month.month]}</h2>
            <p className="text-gray-500 text-sm">
              ({month.count} {month.count === 1 ? "book" : "books"})
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {month.user_books.map((book) => (
              <div key={book.book_id} className="border rounded-lg p-4">
                <UserBook book={book} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
