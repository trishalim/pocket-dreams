import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Button from "@/components/Button";

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
      <h1 className="font-serif text-4xl font-semibold mb-8">
        Welcome back, bookworm.
      </h1>
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
        className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Signing In..."
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
