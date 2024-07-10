"use client";

import type { books, user_books } from "@prisma/client";
import { getUser } from "@/app/actions/user";
import { removeBookFromShelf } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
    <div className="grid gap-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p>{author_name}</p>
      </div>

      <p className="line-clamp-5 text-ellipsis text-gray-500">{review}</p>
      <p>{rating}</p>
      <p>Read on {readAt}</p>

      <button
        onClick={() => remove()}
        type="button"
        className="py-2 px-3 rounded-md bg-black text-white"
        disabled={isRemoving}
      >
        {isRemoving ? "Removing..." : "Remove"}
      </button>
    </div>
  );
}
