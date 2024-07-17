import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Providers from "@/components/Providers";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { getUser } from "@/app/actions/user";

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
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <html lang="en" className={`${fraunces.variable} ${GeistSans.className}`}>
      <body className="bg-white flex-1 w-full flex flex-col items-center">
        <div className="flex-1 flex flex-col w-full">
          {user && (
            <header>
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-4 text-sm">
                  <div className="flex gap-3">
                    <Link
                      className="font-medium px-3 hover:bg-gray-100 rounded py-2 px-3"
                      href="/"
                    >
                      Home
                    </Link>
                  </div>
                  <AuthButton />
                </div>
              </nav>
            </header>
          )}
          <main className="w-full">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
