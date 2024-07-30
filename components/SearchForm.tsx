"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";

export default function SearchForm({
  q,
  className = "",
}: {
  q: string;
  className?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(q);

  return (
    <Container>
      <h2 className="text-center font-serif text-4xl leading-normal lg:text-5xl lg:leading-relaxed font-semibold text-gradient mb-5">
        What have you <span className="whitespace-nowrap">read lately?</span>
      </h2>
      <form
        action={`/search?q=${searchQuery}`}
        method="get"
        className={`${className} flex gap-5 md:gap-3`}
      >
        <label htmlFor="q" className="sr-only">
          Search
        </label>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search books"
            className="w-full rounded-full text-lg ring-1 ring-purple-100/20 pl-6 pr-32 md:text-xl py-4 bg-purple-300/10 placeholder:text-purple-100/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            value={searchQuery}
            name="q"
            required
            id="q"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="h-full flex items-center absolute top-0 right-2">
            <Button size="lg">Search</Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
