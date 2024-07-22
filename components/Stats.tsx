import { BookShelfResponse } from "@/app/interfaces/book-shelf";
import BookList from "@/components/BookList";
import Link from "next/link";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import StarIcon from "@/components/icons/StarIcon";

export default function Stats({ data }: { data: BookShelfResponse }) {
  const { totalCount, byMonth, year } = data;
  const currentYear = new Date().getFullYear();

  let latestMonth = new Date().getMonth() + 1;

  if (year !== currentYear) {
    latestMonth = 12;
  }
  const average = Math.round((totalCount / latestMonth) * 10) / 10;

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
        <h2 className="font-semibold">Best reads</h2>
        <ul className="leading-relaxed flex flex-col gap-1">
          {data.favorites.map((book) => (
            <li key={book.book_id}>
              <Link href={`/book/${book.book_id}`} className="flex gap-1.5">
                <StarIcon className="mt-0.5 text-xl text-yellow-400" />
                {book.book.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
