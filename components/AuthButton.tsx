import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <LogoutButton userId={user.id} />
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 inline-flex rounded-lg no-underline bg-teal-500 text-white/95 border-b-4 border-teal-600 hover:text-white hover:bg-[#1dccb9] font-semibold"
    >
      Get started
    </Link>
  );
}
