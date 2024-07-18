import Container from "@/components/Container";
import SearchForm from "@/components/SearchForm";
import { BookDocument } from "@/app/interfaces/open-library";
import BookSearchResult from "@/components/BookSearchResult";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let q = "";

  if (Array.isArray(searchParams?.q)) {
    q = searchParams.q.length > 0 ? searchParams.q[0] : "";
  } else if (typeof searchParams?.q === "string") {
    q = searchParams.q;
  }

  let results = [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${q}&limit=10`,
  );

  if (response) {
    results = await response.json();
  }

  return (
    <Container>
      <h1 className="font-serif text-2xl lg:text-4xl font-bold mb-3">
        Search books
      </h1>

      <SearchForm q={q} />

      <div className="grid border-y border-gray-100 mt-3 divide-y divide-gray-100">
        {results?.docs?.map((r: BookDocument) => (
          <BookSearchResult key={r.key} book={r} />
        ))}
      </div>
    </Container>
  );
}
