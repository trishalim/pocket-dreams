"use client";

import type { books, user_books } from "@prisma/client";
import { getUser } from "@/app/actions/user";
import { removeBookFromShelf } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Rating from "@/components/Rating";
import Link from "next/link";

interface Props extends user_books {
  book: books;
}

export default function UserBook({ book }: { book: Props }) {
  const queryClient = useQueryClient();

  const { review, rating, read_at } = book;
  const { title, author_name, id } = book.book;

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
    <Link
      href={`/book/${book.book_id}`}
      className="flex flex-col justify-between gap-3 h-full"
    >
      <div className="grid gap-2">
        <div>
          <h2 className="text-lg leading-none font-semibold mb-1">{title}</h2>
          <p className="text-sm text-gray-700">by {author_name}</p>
        </div>

        {review && (
          <p className="line-clamp-5 text-sm italic text-ellipsis text-gray-500">
            {review}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Rating rating={rating} />
        <button
          onClick={() => remove()}
          type="button"
          className="py-2 px-3 rounded-md bg-black text-white"
          disabled={isRemoving}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </Link>
  );
}
