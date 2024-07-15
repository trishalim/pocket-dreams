import SearchBooks from "@/components/SearchBooks";

export default function Add() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <h1 className="font-serif text-2xl lg:text-4xl font-bold mb-3">
        What did you read lately?
      </h1>
      <SearchBooks></SearchBooks>
    </div>
  );
}
