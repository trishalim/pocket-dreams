'use client'

import type { books } from "@prisma/client";
import {getUser} from "@/app/actions/user";
import {removeBookFromShelf} from "@/app/actions/userBooks";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export default function UserBook({book}: { book: books }) {
  const queryClient = useQueryClient()

  const { data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return getUser()
    },
  })

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationFn: () => {
      return removeBookFromShelf(book.id)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user_with_books', user?.id] }),
    onError: () => {
      console.log('error')
    }
  })

  return (
    <div className="grid gap-3">
      <div>
        <h2 className="text-lg font-semibold">
          {book.title}
        </h2>
        <p>{book.author_name}</p>
      </div>

      <button
        onClick={() => remove()}
        type="button"
        className="py-2 px-3 rounded-md bg-black text-white"
        disabled={isRemoving}>
        {isRemoving ? 'Removing...' : 'Remove'}
      </button>
    </div>
  )
}
