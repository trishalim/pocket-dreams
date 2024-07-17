import { prisma } from "@/utils/prisma";
import { getUser } from "@/app/actions/user";
import EditBookForm from "@/components/EditBookForm";
import Container from "@/components/Container";
import { redirect } from "next/navigation";
import UserBookHeader from "@/components/UserBookHeader";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
    return;
  }

  const book = await prisma.user_books.findUnique({
    where: {
      user_id_book_id: {
        user_id: user.id,
        book_id: params.slug,
      },
    },
    include: {
      book: true,
    },
  });

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Container className="grid gap-6">
      <UserBookHeader book={book} />

      <EditBookForm book={book} />
    </Container>
  );
}
