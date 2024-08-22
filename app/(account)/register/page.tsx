"use client";

import Button from "@/components/Button";
import Link from "next/link";
import Heading from "@/app/(account)/Heading";
import { signUp } from "@/components/actions/signup";
import { useFormState } from "react-dom";

export default function Register() {
  const [state, formAction] = useFormState(signUp as any, {
    message: "",
    ok: false,
  });

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
        formAction={formAction}
        pendingText="Signing Up..."
        size="lg"
      >
        Sign up
      </Button>

      {state?.message && <p className="text-red-400 mt-4">{state.message}</p>}

      <div className="border-t border-white/10 mt-4 pt-4 text-purple-100/60 text-center">
        Already have an account?{" "}
        <Link className="underline font-medium text-purple-100" href="/login">
          Sign in
        </Link>
      </div>
    </form>
  );
}
