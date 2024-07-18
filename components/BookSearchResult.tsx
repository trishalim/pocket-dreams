"use client";

import { BookDocument } from "@/app/interfaces/open-library";
import { addBook } from "@/app/actions/books";
import { getUser } from "@/app/actions/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function BookSearchResult({ book }: { book: BookDocument }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const split = book.key.split("/");
  const slug = split[split.length - 1];

  console.log("search result: ", book);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { isPending, mutate: add } = useMutation({
    mutationFn: async () => {
      const {
        title,
        title_sort,
        first_publish_year,
        number_of_pages_median,
        key,
        cover_edition_key,
      } = book;

      const payload = {
        title,
        title_sort,
        first_publish_year,
        author_name: book.author_name[0],
        number_of_pages_median,
        open_library_key: key,
        open_library_cover_edition_key: cover_edition_key,
      };

      if (user) {
        addBook(book).then((response) => {
          router.push(`/add/${slug}`);
        });
      }
    },
    mutationKey: ["user_with_books", user?.id],
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["user_with_books", user?.id],
      }),
  });

  return (
    <div className="py-5 flex justify-between gap-3" key={book.title}>
      <div>
        <div className="font-medium leading-none mb-2">{book.title}</div>
        <div className="leading-none text-sm text-gray-600">
          {book.author_name[0]}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => add()}
          className="rounded-md border px-3 py-2 font-medium whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Select
        </button>
        {/*<button*/}
        {/*  onClick={() => add()}*/}
        {/*  type="button"*/}
        {/*  className="rounded-md border px-3 py-2 font-medium whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors"*/}
        {/*>*/}
        {/*  Add to shelf*/}
        {/*</button>*/}
      </div>
    </div>
  );
}
