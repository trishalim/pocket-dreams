"use client";

import type { books, user_books } from "@prisma/client";
import { getUser } from "@/app/actions/user";
import { removeBookFromShelf } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Rating from "@/components/Rating";
import Link from "next/link";
import Image from "next/image";
import StarIcon from "@/components/icons/StarIcon";

interface Props extends user_books {
  book: books;
}

export default function UserBook({ book }: { book: Props }) {
  const queryClient = useQueryClient();

  const { review, rating, read_at } = book;
  const { title, author_name, id, open_library_cover_edition_key } = book.book;
  const coverUrl = `https://covers.openlibrary.org/b/olid/${open_library_cover_edition_key}-L.jpg`;

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
    <div className="rounded-xl flex flex-col border shadow-sm bg-white">
      <Link
        href={`/book/${book.book_id}`}
        className="p-5 flex-1 h-[240px] flex justify-center items-center"
      >
        <Image
          width={130}
          height={200}
          src={coverUrl}
          objectFit="cover"
          alt=""
          className="rounded-lg"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between gap-3 pb-5 px-5 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <div className="flex gap-2 items-center text-xs text-gray-500">
            <p>{author_name}</p>
            <div className="flex gap-0.5 text-yellow-400">
              <StarIcon className="text-yellow-400 mt-px" />
              {rating}
            </div>
          </div>
          {review && (
            <p className="mt-3 line-clamp-5 text-sm italic text-ellipsis text-gray-500">
              {review}
            </p>
          )}
        </div>
        <button
          onClick={() => remove()}
          type="button"
          disabled={isRemoving}
          className="text-gray-500 text-sm underline text-left"
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
