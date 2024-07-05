import { redirect } from "next/navigation";
import {getUser} from "@/app/actions/user";
import BookShelf from "@/components/BookShelf";

export default async function ProtectedPage() {
  const user = await getUser()

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-12">My book shelf</h1>
      <BookShelf/>
    </>
  );
}
