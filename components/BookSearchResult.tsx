'use client'

import {BookDocument} from "@/app/interfaces/open-library";
import {addBook} from "@/app/actions/books";
import {getUser} from "@/app/actions/user";
import {addBookToShelf} from "@/app/actions/userBooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export default function BookSearchResult({book}: { book: BookDocument }) {
  const queryClient = useQueryClient()

  const { data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return getUser()
    },
  })

  const { isPending, mutate: add} = useMutation({
    mutationFn: async () => {
      const {title, title_sort, first_publish_year, number_of_pages_median, key, cover_edition_key} = book

      const payload = {
        title,
        title_sort,
        first_publish_year,
        author_name: book.author_name[0],
        number_of_pages_median,
        open_library_key: key,
        open_library_cover_edition_key: cover_edition_key,
      }

      if (user) {
        await addBook(book)
        await addBookToShelf(book.key)
      }
    },
    mutationKey: ['user_with_books', user?.id],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user_with_books', user?.id] }),
  })

  return (
    <div className="py-5 flex justify-between gap-3" key={book.title}>
      <div>
        <h2 className="font-medium text-lg leading-none mb-2">{book.title}</h2>
        <p className="leading-none text-gray-600">{book.author_name[0]}</p>
      </div>
      <div>
        <button
          onClick={() => add()}
          type="button"
          className="rounded-md border px-3 py-2 font-medium whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Add to shelf
        </button>
      </div>
    </div>
  )
}
