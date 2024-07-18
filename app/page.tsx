import BookShelf from "@/components/BookShelf";
import Container from "@/components/Container";
import { getUser } from "@/app/actions/user";
import SearchForm from "@/components/SearchForm";
import LandingPage from "@/components/LandingPage";

export default async function Index({
  searchParams,
}: {
  searchParams: { year: number };
}) {
  const user = await getUser();

  if (!user) {
    return <LandingPage />;
  }

  const year = searchParams.year || new Date().getFullYear();

  return (
    <>
      <div className="bg-[#f9f6ed] border-b">
        <Container>
          <h2 className="text-center font-serif text-2xl md:text-4xl font-semibold mb-5">
            What have you read lately?
          </h2>
          <SearchForm q="" className="max-w-2xl mx-auto" />
        </Container>
      </div>
      <Container className="grid gap-12">
        <BookShelf year={year} />
      </Container>
    </>
  );
}
