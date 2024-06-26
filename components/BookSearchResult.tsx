import {BookDocument} from "@/app/interfaces/open-library";

export default function BookSearchResult({ book } : { book: BookDocument }) {
  return (
    <div className="py-5 flex justify-between gap-3" key={book.title}>
      <div>
        <h2 className="font-medium text-lg leading-none mb-2">{book.title}</h2>
        <p className="leading-none text-gray-600">{book.author_name[0]}</p>
      </div>
      <div>
        <button type="button" className="rounded-md border px-3 py-2 font-medium whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors">
          Add to shelf
        </button>
      </div>
    </div>
  )
}
