'use client'

import type { user_books, books } from "@prisma/client";
import {prisma} from "@/utils/prisma";
import {getUser} from "@/app/actions/user";
import {removeBookFromShelf} from "@/app/actions/userBooks";

export default function UserBook({book}: { book: books }) {
  return (
    <div className="border rounded-lg p-3 grid gap-3">
      <div>
        <h2 className="text-lg font-semibold">
          {book.title}
        </h2>
        <p>{book.author_name}</p>
      </div>

      <button onClick={() => removeBookFromShelf(book.id)} className="py-2 px-3 rounded-md bg-black text-white">
        Remove
      </button>
    </div>
  )
}
