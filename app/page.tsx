import BookShelf from "@/components/BookShelf";
import Container from "@/components/Container";
import { getUser } from "@/app/actions/user";
import SearchForm from "@/components/SearchForm";
import LandingPage from "@/components/LandingPage";

export default async function Index() {
  const user = await getUser();

  if (!user) {
    return <LandingPage />;
  }

  const year = new Date().getFullYear();

  return (
    <>
      <Container className="grid gap-8">
        <BookShelf year={year} />
      </Container>
      <div className="bg-gray-100">
        <Container>
          <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-5">
            What have you read lately?
          </h2>
          <SearchForm q="" />
        </Container>
      </div>
    </>
  );
}
