import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Providers from "@/components/Providers";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { getUser } from "@/app/actions/user";
import LogoIcon from "@/components/icons/LogoIcon";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

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

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "pocket dreams",
  description: "your minimalist virtual book shelf",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <html lang="en" className={`${fraunces.variable} ${GeistSans.className}`}>
      <Providers>
        <body className="overflow-x-hidden bg-gradient-to-t from-[#3a2d59] to-[#211f5a] bg-cover min-h-screen text-slate-400 flex flex-col">
          <StarrySky className="absolute -top-64 left-0 -z-10" />

          {user && (
            <header>
              <nav className="w-full flex justify-center border-b border-b">
                <div className="w-full max-w-4xl flex justify-between items-center p-4 text-sm">
                  <div className="flex gap-3">
                    <Link className="font-serif text-xl font-medium" href="/">
                      <LogoIcon className="h-10 sm:h-12 w-auto" />
                    </Link>
                  </div>
                  <AuthButton />
                </div>
              </nav>
            </header>
          )}
          <main className="w-full flex-1">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
