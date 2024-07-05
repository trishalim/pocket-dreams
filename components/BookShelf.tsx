'use client'

import {getUserBooks} from "@/app/actions/userBooks";
import {useQuery} from "@tanstack/react-query";
import UserBook from "@/components/UserBook";
import {getUser} from "@/app/actions/user";

export default function BookShelf() {
  const { data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return getUser()
    },
  })

  const { isLoading, data, error} = useQuery({
    queryKey: ['user_with_books', user?.id],
    queryFn: () => {
      return getUserBooks()
    },
  })

  if (isLoading) {
    return <div>Loading books...</div>
  }

  return (
    <div className="grid gap-5">
      <p className="text-gray-500 text-sm">{data?.length} books</p>
      <div className="border-t grid lg:border-t-0 lg:grid-cols-3 lg:gap-5">
        {data?.map(book => <div key={book.book_id} className="py-5 border-b lg:border lg:rounded-lg lg:p-3"><UserBook book={book.book} /></div> )}
      </div>
    </div>
  )
 }
