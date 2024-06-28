import { redirect } from "next/navigation";
import BookList from "@/components/BookList";
import {getUser} from "@/app/actions/user";
import {prisma} from "@/utils/prisma";

export default async function ProtectedPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/login");
  }

  const userBooks = await prisma.user_books.findMany({
    where: {
      user_id: user.id,
    }
  })


  console.log({ userBooks})

  return (
    <>
      <h1 className="text-3xl font-semibold">My book shelf</h1>

      <div>
        {userBooks?.map(book => (
          <div key={book.book_id}>{book.user_id}</div>
        ))}
      </div>
    </>
  );
}
