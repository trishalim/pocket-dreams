import { BookDocument } from "@/app/interfaces/open-library";
import { createClient } from "@/utils/supabase/client";

export const addBook = (book: BookDocument) => {
  const supabase = createClient();

  const {
    title,
    title_sort,
    first_publish_year,
    number_of_pages_median,
    key,
    cover_edition_key,
  } = book;

  const author_name =
    book.author_name && Array.isArray(book.author_name)
      ? book.author_name[0]
      : "";

  const payload = {
    title,
    title_sort,
    first_publish_year,
    author_name,
    number_of_pages_median,
    open_library_key: key,
    open_library_cover_edition_key: cover_edition_key,
  };

  console.log({ payload });

  return supabase.from("books").upsert(payload);
};
