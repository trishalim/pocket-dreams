"use server"

import {getUser} from "@/app/actions/user";
import {getBookByKey} from "@/app/actions/books";
import {createClient} from "@/utils/supabase/server";

const supabase = createClient()
export const addBookToShelf = async (key: string) => {
  console.log('hi')
  const user = await getUser()

  if (user) {
    const response = await getBookByKey(key)
    if (response.data) {
      supabase.from('user_books').insert({
        user_id: user.id,
        book_id: response.data[0].id,
      }).then(() => {
        console.log('added to shelf')
      })
    }
  }
}
