import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Providers from "@/components/Providers";
import { fraunces, roboto } from "@/app/fonts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.className} ${roboto.className} font-sans`}
    >
      <body className="flex-1 w-full flex flex-col items-center">
        <div className="flex-1 flex flex-col w-full">
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
          <main className="w-full">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
