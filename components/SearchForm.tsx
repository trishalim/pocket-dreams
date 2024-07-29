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
        className="w-full rounded-md ring-1 ring-gray-400/30 px-3 py-2 bg-white/10"
        value={searchQuery}
        name="q"
        required
        id="q"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Button>Search</Button>
    </form>
  );
}
