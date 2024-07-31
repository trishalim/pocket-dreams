import BooksIcon from "@/components/icons/BooksIcon";
import Link from "next/link";

export default function Heading({ heading = "" }: { heading: string }) {
  return (
    <h1 className="font-serif text-gradient text-4xl font-semibold mb-5 ">
      {heading}
    </h1>
  );
}
