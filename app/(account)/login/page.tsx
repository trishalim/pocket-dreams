import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import BooksIcon from "@/components/icons/BooksIcon";
import Heading from "@/app/(account)/Heading";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <form className="flex flex-col justify-center gap-2">
      <Heading heading="Welcome back, bookworm." />
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
        formAction={signIn}
        pendingText="Signing in..."
      >
        Sign in
      </Button>
      {searchParams?.message && <p className="mt-4">{searchParams.message}</p>}

      <div className="border-t mt-4 pt-4 text-gray-600 text-center">
        Don&apos;t have an account yet?{" "}
        <Link className="underline font-medium text-gray-800" href="/register">
          Sign up
        </Link>
      </div>
    </form>
  );
}
