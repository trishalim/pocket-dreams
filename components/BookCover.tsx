import { books } from "@prisma/client";
import Image from "next/image";

export default function BookCover({
  book,
  width = 0,
  height = 0,
  className = "",
}: {
  book: books;
  width: number;
  height: number;
  className?: string;
}) {
  const coverUrl = `https://covers.openlibrary.org/b/olid/${book.open_library_cover_edition_key}-L.jpg`;

  return (
    <Image
      src={coverUrl}
      alt=""
      width={width}
      height={height}
      className={`${className} rounded-l-sm rounded-r-md`}
    />
  );
}
