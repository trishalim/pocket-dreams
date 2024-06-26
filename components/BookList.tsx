

import { createClient } from "@/utils/supabase/server";
export default async function BookList() {

const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let books = []

  if (user) {
   const { data: bookShelf} = await supabase.from('user_books').select().eq('user_id', user.id)

   console.log(bookShelf)

    if (bookShelf) {

      const promises = bookShelf?.map(b => {
        console.log({b})
        return fetch(`https://openlibrary.org/works/${b.open_library_key}.json`).then(r => r.json())
      })


      await Promise.all(promises).then((results) => {
        books = results.map(result => ({
          title: result.title,
        }))
      })

      return <div>
        {books?.map(book => (
          <div>{book.title}</div>
        ))}
      </div>
    }

  }

   return <div>book list</div>
 }
