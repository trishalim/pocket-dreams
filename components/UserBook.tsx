"use client";

import type { books, user_books } from "@prisma/client";
import { getUser } from "@/app/actions/user";
import { removeBookFromShelf } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Rating from "@/components/Rating";
import Link from "next/link";
import StarIcon from "@/components/icons/StarIcon";
import BookCover from "@/components/BookCover";

interface Props extends user_books {
  book: books;
}

export default function UserBook({ book }: { book: Props }) {
  const queryClient = useQueryClient();

  const { rating, read_at } = book;
  const { title, author_name, id, open_library_cover_edition_key } = book.book;

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: () => {
      return removeBookFromShelf(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user_with_books", user?.id],
      }),
    onError: () => {
      console.log("error");
    },
  });

  return (
    <div className="flex gap-4">
      <Link href={`/book/${book.book_id}`}>
        <BookCover
          book={book.book}
          width={180}
          height={200}
          className="shadow-lg h-[110px] w-auto"
        />
      </Link>

      <div className="flex-1 p-3 sm:p-0">
        <div>
          <Link href={`/book/${book.book_id}`}>
            <h2 className="text-white line-clamp-2 mb-1">{title}</h2>
            <div className="flex gap-2 items-center text-sm text-gray-500 mb-2">
              <p className="line-clamp-1 text-sm">{author_name}</p>
              <div className="hidden sm:flex gap-0.5 text-xs items-center leading-none font-semibold">
                <StarIcon className="text-yellow-400 text-base -mt-px" />
                {rating}
              </div>
            </div>
          </Link>

          <div className="sm:hidden">
            <Rating rating={rating} className="text-lg" />
          </div>
        </div>
        <button
          onClick={() => remove()}
          type="button"
          disabled={isRemoving}
          className="text-gray-500 text-xs underline text-left"
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
