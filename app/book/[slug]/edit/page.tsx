import { prisma } from "@/utils/prisma";
import { getUser } from "@/app/actions/user";
import Rating from "@/components/Rating";
import EditBookForm from "@/components/EditBookForm";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const book = await prisma.user_books.findUnique({
    where: {
      user_id_book_id: {
        user_id: user.id,
        book_id: parseInt(params.slug),
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
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16 grid gap-6">
      <div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-3">
          {book.book.title}
        </h1>
        <p>by {book.book.author_name}</p>
      </div>

      <EditBookForm book={book} />
    </div>
  );
}
