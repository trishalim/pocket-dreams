import { prisma } from "@/utils/prisma";

export default async function Page({params}: { params: { slug: string } }) {
  const book = await prisma.books.findUnique({
    where: {
      open_library_key: `/works/${params.slug}`,
    },
  });

  console.log({book})

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <h1 className="text-2xl lg:text-4xl font-bold mb-8">
        Add book to your shelf
      </h1>

      {book && (
        <form className="grid gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {book.title}
            </h2>
            <p>
              by {book.author_name}
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="review" className="font-medium">Review <span className="font-normal">(optional)</span> </label>
            <textarea placeholder="Your thoughts on this book" name="review" className="w-full rounded-md border px-3 py-2">
            </textarea>
          </div>

          <div className="flex gap-3 items-center">
            <label htmlFor="rating" className="font-medium">Rating <span className="font-normal">(optional)</span> </label>
            <input type="range" min="1" max="5" name="rating" id="rating" className="w-36 w-full rounded-md border px-3 py-2"/>
          </div>

          <button type="submit" className="rounded-md bg-black text-white px-4 py-2 font-medium">Add to shelf</button>
        </form>
      )}
    </div>
  );
}
