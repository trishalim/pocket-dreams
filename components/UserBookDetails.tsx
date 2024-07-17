"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserBook } from "@/app/actions/userBooks";
import { User } from "@supabase/auth-js";
import Container from "@/components/Container";
import UserBookHeader from "@/components/UserBookHeader";

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
    <Container className="grid gap-12">
      <UserBookHeader book={book} />

      <div className="grid gap-4">
        <h2 className="uppercase text-sm tracking-widest font-semibold border-b pb-3">
          Your review
        </h2>

        {book.review ? (
          <p className="text-gray-800 leading-relaxed">{book.review}</p>
        ) : (
          <p className="text-gray-500 italic leading-relaxed">
            You did not write a review for this book yet.
          </p>
        )}

        <Link
          href={`/book/${book.book_id}/edit`}
          className="text-sm text-gray-500 underline"
        >
          Edit
        </Link>
      </div>
    </Container>
  );
}
