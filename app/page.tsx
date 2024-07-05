import SearchBooks from "@/components/SearchBooks";

export default async function Index() {
  return (
    <main>
      <div className="py-8 lg:py-16">
        <h1 className="text-2xl lg:text-4xl font-bold mb-3">
          What have you read lately?
        </h1>
        <SearchBooks></SearchBooks>
      </div>
    </main>
  );
}
