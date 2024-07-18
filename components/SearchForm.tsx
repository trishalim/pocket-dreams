"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function SearchForm({
  q,
  className = "",
}: {
  q: string;
  className?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(q);
  return (
    <form
      action={`/search?q=${searchQuery}`}
      method="get"
      className={`${className} flex gap-3`}
    >
      <label htmlFor="q" className="sr-only">
        Search
      </label>

      <input
        type="text"
        placeholder="Search books"
        className="w-full rounded-md border px-3 py-2"
        value={searchQuery}
        name="q"
        required
        id="q"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button className="rounded-md bg-black text-white px-4 py-2 font-medium">
        Search
      </Button>
    </form>
  );
}
