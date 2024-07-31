import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import Heading from "@/app/(account)/Heading";

export default function Register({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/register?message=Could not authenticate user");
    }

    return redirect(
      "/register?message=Check email to continue sign in process",
    );
  };

  return (
    <form className="flex flex-col justify-center gap-2">
      <Heading heading="Let's get started, bookworm." />

      <label className="font-medium text-purple-100/80" htmlFor="email">
        Email address
      </label>
      <input
        className="w-full rounded-md ring-1 ring-gray-400/30 px-3 py-2 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-200 text-white mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />

      <label className="font-medium text-purple-100/80" htmlFor="password">
        Password
      </label>
      <input
        className="w-full rounded-md ring-1 ring-gray-400/30 px-3 py-2 bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-200 text-white mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        variant="primary"
        formAction={signUp}
        pendingText="Signing Up..."
        size="lg"
      >
        Sign up
      </Button>

      {searchParams?.message && (
        <p className="text-purple-100 mt-4">{searchParams.message}</p>
      )}

      <div className="border-t border-white/10 mt-4 pt-4 text-purple-100/60 text-center">
        Already have an account?{" "}
        <Link className="underline font-medium text-purple-100" href="/login">
          Sign in
        </Link>
      </div>
    </form>
  );
}
