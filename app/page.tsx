import SearchBooks from "@/components/SearchBooks";
import BookShelf from "@/components/BookShelf";

export default async function Index() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
        <BookShelf />
      </div>
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-2xl lg:text-4xl font-bold mb-3">
            What have you read lately?
          </h2>
          <SearchBooks></SearchBooks>
        </div>
      </div>
    </>
  );
}
