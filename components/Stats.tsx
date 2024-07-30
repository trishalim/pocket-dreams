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
    <div className="grid md:grid-cols-3 gap-6">
      <div className="border-2 border-white/10 rounded p-5 flex flex-col gap-1 ">
        <p className="font-semibold font-serif text-white text-4xl">
          {totalCount}
        </p>
        <p className="text-gray-500">books read</p>
      </div>
      <div className="border-2 border-white/10 rounded p-5 flex flex-col gap-1 ">
        <p className="font-semibold font-serif text-white text-4xl">
          {average}
        </p>
        <p className="text-gray-500">books per month</p>
      </div>
      <div className="border-2 border-white/10 rounded p-5 flex flex-col gap-2 ">
        <h2 className="font-semibold text-white">Best reads</h2>
        {data.favorites?.length ? (
          <ul className="text-gray-400 leading-relaxed flex flex-col gap-1">
            {data.favorites.map((book) => (
              <li key={book.book_id}>
                <Link
                  href={`/book/${book.book_id}`}
                  className="flex text-sm gap-1.5"
                >
                  <StarIcon className="text-lg text-yellow-400 shrink-0" />
                  {book.book.title}
                </Link>
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
