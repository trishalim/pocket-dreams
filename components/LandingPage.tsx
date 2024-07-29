import AuthButton from "@/components/AuthButton";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import ViewColumnsIcon from "@/components/icons/ViewColumnsIcon";
import Button from "@/components/Button";
import Link from "next/link";
import LogoIcon from "@/components/icons/LogoIcon";

const StarrySky = ({ className }: { className?: string }) => (
  <svg
    width="1500"
    height="800"
    className={className}
    viewBox="0 0 1920 1080"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="starGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
      </radialGradient>
      <radialGradient
        id="brightStarGradient"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
        <stop offset="70%" style={{ stopColor: "white", stopOpacity: 0.7 }} />
        <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="transparent" />
    {/* Regular stars */}
    <circle cx="50" cy="50" r="2" fill="url(#starGradient)" />
    <circle cx="200" cy="100" r="1.5" fill="url(#starGradient)" />
    <circle cx="400" cy="200" r="2.5" fill="url(#starGradient)" />
    <circle cx="600" cy="150" r="2" fill="url(#starGradient)" />
    <circle cx="800" cy="300" r="1.5" fill="url(#starGradient)" />
    <circle cx="1000" cy="250" r="2" fill="url(#starGradient)" />
    <circle cx="1200" cy="100" r="1" fill="url(#starGradient)" />
    <circle cx="1400" cy="350" r="2.5" fill="url(#starGradient)" />
    <circle cx="1600" cy="200" r="2" fill="url(#starGradient)" />
    <circle cx="1800" cy="100" r="1.5" fill="url(#starGradient)" />
    <circle cx="200" cy="600" r="2" fill="url(#starGradient)" />
    <circle cx="400" cy="800" r="1.5" fill="url(#starGradient)" />
    <circle cx="600" cy="900" r="2" fill="url(#starGradient)" />
    <circle cx="800" cy="700" r="1" fill="url(#starGradient)" />
    <circle cx="1000" cy="800" r="2.5" fill="url(#starGradient)" />
    <circle cx="1200" cy="950" r="2" fill="url(#starGradient)" />
    <circle cx="1400" cy="700" r="1.5" fill="url(#starGradient)" />
    <circle cx="1600" cy="900" r="2" fill="url(#starGradient)" />
    <circle cx="1800" cy="800" r="1.5" fill="url(#starGradient)" />
    <circle cx="500" cy="400" r="2" fill="url(#starGradient)" />
    <circle cx="700" cy="500" r="1.5" fill="url(#starGradient)" />
    <circle cx="900" cy="600" r="2" fill="url(#starGradient)" />
    <circle cx="1100" cy="450" r="2.5" fill="url(#starGradient)" />
    <circle cx="1300" cy="300" r="2" fill="url(#starGradient)" />
    <circle cx="1500" cy="400" r="1.5" fill="url(#starGradient)" />
    <circle cx="1700" cy="350" r="2" fill="url(#starGradient)" />
    <circle cx="1900" cy="500" r="2.5" fill="url(#starGradient)" />
    {/* Brighter stars */}
    <circle cx="100" cy="150" r="3" fill="url(#brightStarGradient)" />
    <circle cx="300" cy="50" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="500" cy="250" r="3" fill="url(#brightStarGradient)" />
    <circle cx="700" cy="200" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="900" cy="350" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1100" cy="300" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1300" cy="150" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1500" cy="400" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1700" cy="300" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1900" cy="200" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="250" cy="650" r="3" fill="url(#brightStarGradient)" />
    <circle cx="450" cy="850" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="650" cy="950" r="3" fill="url(#brightStarGradient)" />
    <circle cx="850" cy="750" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1050" cy="850" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1250" cy="1000" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1450" cy="750" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1650" cy="950" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1850" cy="850" r="3" fill="url(#brightStarGradient)" />
    <circle cx="550" cy="450" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="750" cy="550" r="3" fill="url(#brightStarGradient)" />
    <circle cx="950" cy="650" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1150" cy="500" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1350" cy="350" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1550" cy="450" r="3" fill="url(#brightStarGradient)" />
    <circle cx="1750" cy="400" r="2.5" fill="url(#brightStarGradient)" />
    <circle cx="1950" cy="550" r="3" fill="url(#brightStarGradient)" />
  </svg>
);
export default function LandingPage() {
  return (
    <>
      <StarrySky className="absolute -top-64 left-0 -z-10" />
      <div className="py-4 max-w-5xl mx-auto px-4 lg:flex gap-12 items-center bg-purple-gradient lg:min-h-screen">
        <div>
          <LogoIcon className="text-purple-100 h-12 w-auto mb-12 lg:mb-5"></LogoIcon>
          <h1 className="font-serif font-semibold inline text-5xl lg:text-6xl text-gradient">
            Your minimalist{" "}
            <span className="whitespace-nowrap">virtual book shelf</span>
          </h1>
          <p className="mt-5 text-xl tracking-tight font-light leading-relaxed">
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
