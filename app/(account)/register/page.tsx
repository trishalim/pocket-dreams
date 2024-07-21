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

      <label htmlFor="email">Email address</label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        variant="primary"
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Signing Up..."
      >
        Sign up
      </Button>

      {searchParams?.message && <p className="mt-4">{searchParams.message}</p>}

      <div className="border-t mt-4 pt-4 text-gray-600 text-center">
        Already have an account?{" "}
        <Link className="underline font-medium text-gray-800" href="/login">
          Sign in
        </Link>
      </div>
    </form>
  );
}
