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
    `https://openlibrary.org/search.json?q=${q}&limit=8`,
  );

  if (response) {
    results = await response.json();
  }

  return (
    <>
      <SearchForm q={q} className="max-w-2xl mx-auto" />
      <Container className="mt-5">
        {results?.docs?.length ? (
          <div className="grid md:grid-cols-3 gap-3">
            {results?.docs?.map((r: BookDocument) => (
              <BookSearchResult key={r.key} book={r} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
