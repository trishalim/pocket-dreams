import AuthButton from "@/components/AuthButton";
import BookOpenIcon from "@/components/icons/BookOpenIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import ViewColumnsIcon from "@/components/icons/ViewColumnsIcon";

export default function LandingPage() {
  return (
    <>
      <div className="bg-[#f9f6ed] py-12 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 items-center gap-4">
            <div className="md:col-span-2 md:py-5 lg:py-8 grid gap-8">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold">
                A minimalist way to <br />
                track the books you read
              </h1>
              <p className="text-gray-500 md:hidden">
                Create your virtual book shelf without all the fuss.
              </p>
              <div className="hidden md:block">
                <AuthButton />
              </div>
            </div>
            <div className="md:pr-8 order-first w-32 mb-5 md:mb-0 md:order-last md:w-auto">
              <img src="/images/books.svg" />
            </div>
          </div>
          <div className="md:hidden">
            <AuthButton />
          </div>
          <img className="hidden md:block lg:-mx-4" src="/images/shelf.svg" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 py-8 lg:py-16">
        <h2 className="hidden lg:block font-serif text-3xl font-semibold mb-10">
          Create your virtual book shelf without all the fuss.
        </h2>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="rounded-xl p-5 bg-white shadow-lg ring-1 ring-gray-300/10">
            <BookOpenIcon className="text-teal-500 text-3xl lg:text-5xl mb-3" />
            <h3 className="text-lg lg:text-2xl font-serif font-semibold mb-3">
              Add books
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Make a list of all the books you read this year. This is now your
              virtual book shelf!
            </p>
          </div>
          <div className="rounded-xl p-5 bg-white shadow-lg ring-1 ring-gray-300/10">
            <StarOutlineIcon className="text-teal-500 text-3xl lg:text-5xl mb-3" />
            <h3 className="text-lg lg:text-2xl font-serif font-semibold mb-3">
              Rate and review
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Write a short review for each book you ready, and rate them out of
              5 stars.
            </p>
          </div>
          <div className="rounded-xl p-5 bg-white shadow-lg ring-1 ring-gray-300/10">
            <ViewColumnsIcon className="text-teal-500 text-3xl lg:text-5xl mb-3" />
            <h3 className="text-lg lg:text-2xl font-serif font-semibold mb-3">
              See overview
            </h3>
            <p className="text-gray-500 leading-relaxed">
              All the books you read this year in one screen, the total number,
              and a list of your favorites.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
