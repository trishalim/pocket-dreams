"use client";

import { BookDocument } from "@/app/interfaces/open-library";
import { addBook } from "@/app/actions/books";
import { getUser } from "@/app/actions/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Error from "@/components/Error";

export default function BookSearchResult({ book }: { book: BookDocument }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const split = book.key.split("/");
  const slug = split[split.length - 1];
  const author_name =
    book.author_name && Array.isArray(book.author_name)
      ? book.author_name[0]
      : null;

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const {
    isPending,
    mutate: add,
    error,
  } = useMutation({
    mutationFn: async () => {
      if (user) {
        addBook(book).then((response) => {
          router.push(`/book/${slug}`);
        });
      }
    },
    mutationKey: ["user_with_books", user?.id],
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user_with_books", user?.id],
      }),
  });

  if (!author_name) {
    return <></>;
  }

  return (
    <div className="py-5 flex justify-between gap-3" key={book.title}>
      <div>
        <div className="font-medium leading-none mb-2">{book.title}</div>
        {author_name && (
          <div className="leading-none text-sm text-gray-600">
            {author_name}
          </div>
        )}

        {error && <Error error={error} />}
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          type="button"
          onClick={() => add()}
        >
          Select
        </Button>
      </div>
    </div>
  );
}
