import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Providers from "@/components/Providers";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { getUser } from "@/app/actions/user";
import LogoIcon from "@/components/icons/LogoIcon";
import Container from "@/components/Container";

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
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.className} bg-purple-1000`}
    >
      <Providers>
        <body className="overflow-x-hidden min-h-screen flex flex-col">
          {user && (
            <header className="absolute top-0 left-0 right-0 z-10">
              <nav className="w-full flex justify-center">
                <div className="w-full max-w-4xl flex justify-between items-center px-4 py-6 text-sm">
                  <div className="flex gap-3">
                    <Link className="font-serif text-xl font-medium" href="/">
                      <LogoIcon className="text-purple-100 h-10 sm:h-12 w-auto" />
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
