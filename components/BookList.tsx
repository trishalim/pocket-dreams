

import { createClient } from "@/utils/supabase/server";
import {getUser} from "@/app/actions/user";
export default async function BookList({ books }: { books: any[] }) {
  return (
    <div>
      {books?.map(book => (
        <div key={book.book_id}>{book.book_id}</div>
      ))}
    </div>
  )
 }
