import BooksIcon from "@/components/icons/BooksIcon";
import Link from "next/link";

export default function Heading({ heading = "" }: { heading: string }) {
  return (
    <div className="flex flex-col items-start gap-6 mb-5 sm:flex-row sm:items-center">
      <Link href="/" aria-label="Go to homepage">
        <BooksIcon className="h-16 sm:h-28 w-auto sm:order-last" />
      </Link>
      <h1 className="font-serif text-gradient text-4xl font-semibold">
        {heading}
      </h1>
    </div>
  );
}
