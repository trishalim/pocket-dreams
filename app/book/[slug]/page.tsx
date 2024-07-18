import { getUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { getUserBook } from "@/app/actions/userBooks";
import AddBookForm from "@/components/AddBookForm";
import Container from "@/components/Container";
import UserBookHeader from "@/components/UserBookHeader";
import EditBookForm from "@/components/EditBookForm";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const book = await prisma.books.findUnique({
    where: {
      open_library_key: `/works/${params.slug}`,
    },
  });

  if (!book) {
    return <div>Book not found</div>;
  }

  const userBook = await getUserBook(book.id);

  if (userBook) {
    console.log({ userBook });
    return (
      <Container className="grid gap-6">
        <UserBookHeader book={userBook} />

        <EditBookForm book={userBook} />
      </Container>
    );
  } else {
    return (
      <Container>
        <AddBookForm book={book} />
      </Container>
    );
  }
}
