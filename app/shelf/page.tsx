import { redirect } from "next/navigation";
import BookList from "@/components/BookList";
import {getUser} from "@/app/actions/user";
import {prisma} from "@/utils/prisma";

export default async function ProtectedPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/login");
  }

  // const userBooks = await prisma.user_books.findMany({
  //   where: {
  //     user_id: user.id,
  //   }
  // })
  const userWithBooks = await prisma.users.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      user_books: {
        include: {
          book: true
        }
      }
    },
  })

  console.log({ user: userWithBooks })

  return (
    <>
      <h1 className="text-3xl font-semibold">My book shelf</h1>

      <div>
        {userWithBooks.user_books.map(userBook => (
          <div key={userBook.book_id}>{userBook.book.title}</div>
        ))}
      </div>
    </>
  );
}
