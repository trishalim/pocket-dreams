import BooksIcon from "@/components/icons/BooksIcon";

export default function Heading({ heading = "" }: { heading: string }) {
  return (
    <div className="flex flex-col items-start gap-6 mb-5 sm:flex-row sm:items-center">
      <BooksIcon className="h-16 sm:h-28 w-auto sm:order-last" />
      <h1 className="font-serif text-4xl font-semibold">{heading}</h1>
    </div>
  );
}
