import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import Button from "@/components/Button";

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
      <span className="hidden sm:inline-block text-white/50">
        {" "}
        {user.email}
      </span>
      <LogoutButton />
    </div>
  ) : (
    <Button href="/register">Get started</Button>
  );
}
