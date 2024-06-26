import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }


  const { data: books } = await supabase.from('book_shelf').select().eq('user_id', user.id)

  console.log(books)

  return <pre>{JSON.stringify(books, null, 2)}</pre>

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <DeployButton />
            <AuthButton />
          </div>
        </nav>
      </div>

      <main className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold">My book shelf</h1>
      </main>
    </div>
  );
}
