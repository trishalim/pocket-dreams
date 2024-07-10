"use client"

import { books } from '@prisma/client'

import {useState} from "react";
import {prisma} from "@/utils/prisma";
import {useRouter} from "next/navigation";
import {addUserBook} from "@/app/actions/userBooks";
export default function AddBookForm({ book } : { book: books}) {

  const [rating, setRating] = useState(1)
  const [review, setReview] = useState('')

  const router = useRouter()
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addUserBook({
      book_id: book.id,
      review,
      rating,
    }).then(() => {
      router.push('/')
    }).catch((e) => {
      console.log('ERROR',e)
    })
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <div>
        <h2 className="text-xl font-semibold">
          {book.title}
        </h2>
        <p>
          by {book.author_name}
        </p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="review" className="font-medium">Review <span className="font-normal">(optional)</span> </label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Your thoughts on this book" name="review" className="w-full rounded-md border px-3 py-2">
            </textarea>
      </div>

      <div className="flex gap-3 items-center">
        <label htmlFor="rating" className="font-medium">Rating <span className="font-normal">(optional)</span> </label>
        <input value={rating} onChange={(e) => setRating(e.target.valueAsNumber)} type="range" min="1" max="5" name="rating" id="rating"
               className="w-36 w-full rounded-md border px-3 py-2" />
      </div>

      <button type="submit" className="rounded-md bg-black text-white px-4 py-2 font-medium">Add to shelf</button>
    </form>
  )
}
