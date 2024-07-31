import { BookShelfResponse } from "@/app/interfaces/book-shelf";
import BookList from "@/components/BookList";
import Link from "next/link";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import StarIcon from "@/components/icons/StarIcon";
import BookCover from "@/components/BookCover";

export default function Stats({ data }: { data: BookShelfResponse }) {
  const { totalCount, byMonth, year } = data;
  const currentYear = new Date().getFullYear();

  let latestMonth = new Date().getMonth() + 1;

  if (year !== currentYear) {
    latestMonth = 12;
  }
  const average = Math.round((totalCount / latestMonth) * 10) / 10;

  return (
    <div className="grid gap-3">
      <div className="border p-3 rounded flex flex-col gap-1">
        <p className="font-semibold text-4xl">{totalCount}</p>
        <p className="text-gray-500">books read</p>
      </div>
      <div className="border p-3 rounded flex flex-col gap-1">
        <p className="font-semibold text-4xl">{average}</p>
        <p className="text-gray-500">books per month</p>
      </div>
      <div className="border p-3 rounded flex flex-col gap-2">
        <h2 className="font-semibold">Best reads</h2>
        {data.favorites?.length ? (
          <ul className="leading-relaxed flex gap-2 overflow-x-auto">
            {data.favorites.map((book) => (
              <li key={book.book_id} className="shrink-0">
                <BookCover
                  book={book.book}
                  width={80}
                  className="h-[120px] w-auto"
                  height={120}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No books rated yet.</p>
        )}
      </div>
    </div>
  );
}
