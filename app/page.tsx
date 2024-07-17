import SearchBooks from "@/components/SearchBooks";
import BookShelf from "@/components/BookShelf";
import Container from "@/components/Container";

export default async function Index() {
  return (
    <>
      <Container className="grid gap-8">
        <BookShelf />
      </Container>
      <div className="bg-gray-100">
        <Container>
          <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-5">
            What have you read lately?
          </h2>
          <SearchBooks></SearchBooks>
        </Container>
      </div>
    </>
  );
}
