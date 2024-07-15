import { Fraunces, Roboto } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fraunces",
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: "400",
});
