import { redirect } from "next/navigation";
import {getUser} from "@/app/actions/user";
import {prisma} from "@/utils/prisma";
import UserBook from "@/components/UserBook";
import BookShelf from "@/components/BookShelf";

export default async function ProtectedPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/login");
  }

  console.log({user})

  return (
    <>
      <h1 className="text-3xl font-semibold mb-12">My book shelf</h1>

      {/*<div className="grid lg:grid-cols-3 gap-5">*/}
      {/*  {userWithBooks.user_books.map(userBook => (*/}
      {/*    <UserBook book={userBook.book} key={userBook.book_id} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <BookShelf/>
    </>
  );
}
