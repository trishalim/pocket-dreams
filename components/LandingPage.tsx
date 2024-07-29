import AuthButton from "@/components/AuthButton";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import ViewColumnsIcon from "@/components/icons/ViewColumnsIcon";
import Button from "@/components/Button";
import Link from "next/link";
import LogoIcon from "@/components/icons/LogoIcon";

export default function LandingPage() {
  return (
    <>
      <div className="py-4 max-w-5xl mx-auto px-4 lg:flex gap-12 items-center lg:min-h-screen">
        <div>
          <LogoIcon className="text-purple-100 h-12 w-auto mb-12 lg:mb-5"></LogoIcon>
          <h1 className="font-serif font-semibold inline text-5xl lg:text-6xl text-gradient">
            Your minimalist{" "}
            <span className="whitespace-nowrap">virtual book shelf</span>
          </h1>
          <p className="mt-5 text-xl tracking-tight font-light text-white/50 leading-relaxed">
            Track books you read without all the fuss from GoodReads.
          </p>
        </div>

        <form className="mt-8 relative flex flex-col gap-5 max-w-sm w-full lg:p-8 lg:bg-slate-900/10 lg:ring-1 lg:ring-purple-200/10 lg:rounded-xl">
          <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-indigo-400/0 via-indigo-400/80 to-indigo-400/0 hidden lg:block"></div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-medium text-purple-100/80">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md ring-1 ring-gray-400/30 px-3 py-2 bg-white/10"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="font-medium text-purple-100/80"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md ring-1 ring-gray-400/30 px-3 py-2 bg-white/10"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-300 font-medium text-lg text-slate-900 px-4 py-2 rounded-full"
          >
            Create account
          </button>

          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <Link className="underline text-purple-100" href="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
