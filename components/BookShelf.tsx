'use client'

import {getUserBooks} from "@/app/actions/userBooks";
import {useQuery} from "@tanstack/react-query";
import UserBook from "@/components/UserBook";

export default function BookShelf() {
  const { isLoading, data, error} = useQuery({
    queryKey: ['user_with_books'],
    queryFn: () => {
      console.log('queryfn')
      return getUserBooks()
    },
  })

  console.log({ data, error, isLoading})
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {data?.map(book => <UserBook book={book.book} key={book.book_id} />)}
    </div>
  )
 }
