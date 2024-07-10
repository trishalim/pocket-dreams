"use server";

import { BookDocument } from "@/app/interfaces/open-library";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();
export const addBook = async (book: BookDocument) => {
  const {
    title,
    title_sort,
    first_publish_year,
    number_of_pages_median,
    key,
    cover_edition_key,
  } = book;

  const payload = {
    title,
    title_sort,
    first_publish_year,
    author_name: book.author_name[0],
    number_of_pages_median,
    open_library_key: key,
    open_library_cover_edition_key: cover_edition_key,
  };

  return await supabase.from("books").upsert(payload);
};

export const getBookByKey = async (key: string) => {
  return await supabase.from("books").select("id").eq("open_library_key", key);
};
