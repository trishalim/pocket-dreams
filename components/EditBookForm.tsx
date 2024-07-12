"use client";

import { books } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserBook } from "@/app/actions/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Error from "./Error";
import { getUser } from "@/app/actions/user";
import RatingInput from "@/components/RatingInput";
import { user_books } from ".prisma/client";

export default function EditBookForm({
  book,
}: {
  book: user_books & { book: books };
}) {
  const [rating, setRating] = useState(book.rating || 0);
  const [review, setReview] = useState(book.review || "");
  const [read_at, setReadAt] = useState(
    book.read_at.toISOString().split("T")[0],
  );

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const {
    mutate: add,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => {
      return updateUserBook({
        book_id: book.book.id,
        review,
        rating,
        read_at: new Date(read_at),
      });
    },
    onSuccess: () => {
      console.log("invalidate", ["user_book", user?.id, book.book.id]);
      queryClient.invalidateQueries({
        queryKey: ["user_book", user?.id, parseInt(book.book.id)],
      });
      router.back();
    },
  });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add();
  };

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <div className="grid gap-2">
        <label htmlFor="review" className="font-medium">
          Review <span className="font-normal">(optional)</span>{" "}
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Your thoughts on this book"
          name="review"
          className="w-full rounded-md border px-3 py-2"
        ></textarea>
      </div>

      <div className="flex gap-3 items-center">
        <label htmlFor="rating" className="font-medium">
          Rating <span className="font-normal">(optional)</span>{" "}
        </label>
        <RatingInput value={rating} onChange={(value) => setRating(value)} />
      </div>

      <div className="flex gap-3 items-center">
        <label htmlFor="read_at" className="font-medium">
          Read on
        </label>
        <input
          type="date"
          name="read_at"
          id="read_at"
          className="rounded-md border px-3 py-2"
          value={read_at}
          onChange={(e) => setReadAt(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-black text-white px-4 py-2 font-medium"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save"}
      </button>

      {error && <Error error={error} />}
    </form>
  );
}
