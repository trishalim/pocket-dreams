import { redirect } from "next/navigation";
import {getUser} from "@/app/actions/user";
import {prisma} from "@/utils/prisma";
import UserBook from "@/components/UserBook";

export default async function ProtectedPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/login");
  }

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

  return (
    <>
      <h1 className="text-3xl font-semibold mb-12">My book shelf</h1>

      <div className="grid lg:grid-cols-3 gap-5">
        {userWithBooks.user_books.map(userBook => (
          <UserBook book={userBook.book} key={userBook.book_id} />
        ))}
      </div>
    </>
  );
}
