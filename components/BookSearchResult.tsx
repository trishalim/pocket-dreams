'use client'

import {BookDocument} from "@/app/interfaces/open-library";
import {createClient} from "@/utils/supabase/client";

export default function BookSearchResult({book}: { book: BookDocument }) {
  const supabase = createClient()

  const addToShelf = () => {
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

    supabase.from('books').upsert(payload).select('id').then(result => {
      console.log('inserted book with id ', result)
    })
  }

  return (
    <div className="py-5 flex justify-between gap-3" key={book.title}>
      <div>
        <h2 className="font-medium text-lg leading-none mb-2">{book.title}</h2>
        <p className="leading-none text-gray-600">{book.author_name[0]}</p>
      </div>
      <div>
        <button
          onClick={addToShelf}
          type="button"
          className="rounded-md border px-3 py-2 font-medium whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors"
        >
          Add to shelf
        </button>
      </div>
    </div>
  )
}
