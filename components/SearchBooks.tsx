"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  BookDocument,
  OpenLibrarySearchResponse,
} from "@/app/interfaces/open-library";
import BookSearchResult from "@/components/BookSearchResult";

export default function SearchBooks() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);

  const { isLoading, isError, data, error } =
    useQuery<OpenLibrarySearchResponse>({
      queryKey: ["books", searchQuery],
      queryFn: () => {
        console.log({ searchQuery });
        return fetch(
          `https://openlibrary.org/search.json?q=${searchQuery}&limit=5`,
        ).then((r: Response) => r.json());
      },
    });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <>
      <form onSubmit={submit} className="flex gap-5">
        <label htmlFor="query" className="sr-only">
          Search
        </label>

        <input
          type="text"
          name="query"
          id="query"
          className="bg-white text-xl w-full px-4 py-3 rounded-md border-0 h-full text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
          onChange={(e) => setQuery(e?.target.value)}
          value={query}
          placeholder="Enter book title or author"
        />

        <button
          type="submit"
          className="text-lg rounded-md bg-black text-white px-4 font-medium"
        >
          Search
        </button>
      </form>

      {query.length > 0 && (
        <div className="mt-5">
          {isLoading ? (
            "Loading..."
          ) : (
            <div className="grid border-y border-gray-100 mt-3 divide-y divide-gray-100">
              {data?.docs?.map((r: BookDocument) => (
                <BookSearchResult key={r.key} book={r} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
