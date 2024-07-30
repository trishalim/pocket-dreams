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
      <div className="w-full pt-20 pb-3 md:pt-24 md:pb-4">
        <SearchForm q="" className="max-w-2xl mx-auto" />
      </div>
      <div className="flex-1 w-full">
        <Container className="grid gap-12">
          <BookShelf year={year} />
        </Container>
      </div>
    </>
  );
}
