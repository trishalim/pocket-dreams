import { prisma } from "@/utils/prisma";
import { getUser } from "@/app/actions/user";
import Rating from "@/components/Rating";

export default async function Page({ params }: { params: { slug: string } }) {
  // const user = await getUser();
  //
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  const book = await prisma.user_books.findUnique({
    where: {
      user_id_book_id: {
        user_id: "c0b12dbf-2020-4cbe-a80a-b3eb2ad9546a",
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
      <div className="flex gap-5 items-center">
        <Rating rating={book.rating} />
        <p>
          Read on {book.read_at.toLocaleString("en-US", { month: "short" })}{" "}
          {book.read_at.getFullYear()}
        </p>
      </div>

      <div>
        <h2 className="uppercase text-sm tracking-widest font-semibold mb-3 border-b pb-3">
          Review
        </h2>
        <p className="text-gray-800 leading-relaxed">{book.review}</p>
      </div>
    </div>
  );
}