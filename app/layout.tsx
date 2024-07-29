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
        <body className="bg-gradient-to-t from-[#3a2d59] to-[#211f5a] min-h-screen text-slate-400 flex flex-col">
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
