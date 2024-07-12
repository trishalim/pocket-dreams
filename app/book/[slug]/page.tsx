import { getUser } from "@/app/actions/user";
import UserBookDetails from "@/components/UserBookDetails";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return <UserBookDetails slug={params.slug} user={user} />;
}
