"use client";

import type { books, user_books } from "@prisma/client";
import { getUser } from "@/app/actions/user";
import { removeBookFromShelf } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Rating from "@/components/Rating";

interface Props extends user_books {
  book: books;
}

export default function UserBook({ book }: { book: Props }) {
  const queryClient = useQueryClient();

  console.log({ book });

  const { review, rating, read_at } = book;
  const { title, author_name, id } = book.book;
  const [readAt, setReadAt] = useState<string | null>();

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

  useEffect(() => {
    if (read_at) {
      setReadAt(
        read_at.toLocaleString("en-US", { month: "short" }) +
          " " +
          read_at.getFullYear(),
      );
    }
  });

  return (
    <div className="flex flex-col justify-between gap-3 h-full">
      <div className="grid gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>by {author_name}</p>

        {review && (
          <p className="line-clamp-5 text-sm italic text-ellipsis text-gray-500">
            {review}
          </p>
        )}

        <div className="flex gap-3 lg:flex-wrap items-center my-2">
          <Rating rating={rating} />
          <span className="lg:hidden">·</span>
          <p className="text-gray-500 text-sm">Read on {readAt}</p>
        </div>
      </div>

      <div>
        <button
          onClick={() => remove()}
          type="button"
          className="py-2 px-3 rounded-md bg-black text-white"
          disabled={isRemoving}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}
