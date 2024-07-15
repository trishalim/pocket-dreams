import { BookShelfResponse } from "@/app/interfaces/book-shelf";
import { months } from "@/utils/months";
import Link from "next/link";
import BookList from "@/components/BookList";

export default function Stats({ data }: { data: BookShelfResponse }) {
  const { totalCount, byMonth } = data;
  const currentMonth = new Date().getMonth();
  const average = Math.round((totalCount / currentMonth) * 10) / 10;

  return (
    <div className="grid md:grid-cols-3 gap-3">
      <div className="border p-3 rounded flex flex-col gap-1">
        <p className="font-semibold text-4xl">{totalCount}</p>
        <p className="text-gray-500">books read</p>
      </div>
      <div className="border p-3 rounded flex flex-col gap-1">
        <p className="font-semibold text-4xl">{average}</p>
        <p className="text-gray-500">books per month</p>
      </div>
      <div className="border p-3 rounded flex flex-col gap-1">
        <h2 className="font-semibold">Favorites</h2>
        <BookList user_books={data.favorites} />
      </div>
    </div>
  );
}
