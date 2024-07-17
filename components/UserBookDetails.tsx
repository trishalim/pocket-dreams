"use client";

import Rating from "@/components/Rating";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserBook } from "@/app/actions/userBooks";
import { User } from "@supabase/auth-js";
import Container from "@/components/Container";

export default function UserBookDetails({
  slug,
  user,
}: {
  slug: string;
  user: User;
}) {
  const { data: book, isPending } = useQuery({
    queryKey: ["user_book", user.id, slug],
    queryFn: () => {
      console.log({ queryKey: ["user_book", user.id, slug] });
      return getUserBook(slug);
    },
  });

  if (isPending) {
    return <Container>Loading...</Container>;
  }

  if (!book) {
    return <Container>Book not found</Container>;
  }

  return (
    <Container className="grid gap-5">
      <div>
        <h1 className="font-serif text-2xl lg:text-4xl font-bold mb-3">
          {book.book.title}
        </h1>
        <p>by {book.book.author_name}</p>
      </div>
      <div className="flex gap-5 items-center">
        <Rating rating={book.rating} />
        <p>Read on {book.read_at.toDateString()}</p>
      </div>

      <div>
        <h2 className="uppercase text-sm tracking-widest font-semibold mb-3 border-b pb-3">
          Review
        </h2>
        {book.review ? (
          <p className="text-gray-800 leading-relaxed">{book.review}</p>
        ) : (
          <p className="text-gray-500 italic leading-relaxed">
            You did not write a review for this book yet.
          </p>
        )}
      </div>

      <Link
        href={`/book/${book.book_id}/edit`}
        className="text-sm text-gray-500 underline"
      >
        Edit
      </Link>
    </Container>
  );
}
