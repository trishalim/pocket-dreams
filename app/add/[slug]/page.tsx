import { prisma } from "@/utils/prisma";
import AddBookForm from "@/components/AddBookForm";

export default async function Page({ params }: { params: { slug: string } }) {
  const book = await prisma.books.findUnique({
    where: {
      open_library_key: `/works/${params.slug}`,
    },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <h1 className="text-2xl lg:text-4xl font-bold mb-8">
        Add book to your shelf
      </h1>

      {book && <AddBookForm book={book} />}
    </div>
  );
}
