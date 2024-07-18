"use client";

import { getUserBooks, getYears } from "@/app/actions/userBooks";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/actions/user";
import BooksByMonth from "@/components/BooksByMonth";
import BooksByYear from "@/components/BooksByYear";
import { useState } from "react";
import Link from "next/link";
import Stats from "@/components/Stats";

export default function BookShelf({ year }: { year: number }) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["user_with_books", user?.id],
    queryFn: () => {
      return getUserBooks(year);
    },
  });

  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return <>Loading books...</>;
  }

  const classNames = {
    base: "font-medium px-3 hover:bg-gray-100 rounded py-2 px-3",
    active: "bg-gray-100",
  };

  return (
    <>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold">
        Books read in {year}
      </h1>
      {data && <Stats data={data} />}
      <div className="flex items-baseline justify-between gap-3 border-b pb-2">
        <div className="flex gap-3">
          <button
            type="button"
            className={`${classNames.base} ${view === "monthly" && classNames.active}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${classNames.base} ${view === "yearly" && classNames.active}`}
            onClick={() => setView("yearly")}
          >
            Yearly
          </button>
        </div>

        <Link
          href="/add"
          type="button"
          className="bg-black text-white px-4 py-2 font-medium rounded-md"
        >
          Add book
        </Link>
      </div>

      {data && view === "monthly" && <BooksByMonth data={data} />}
      {data && view === "yearly" && <BooksByYear data={data} />}
    </>
  );
}
