"use client";

import { getUserBooks } from "@/app/actions/userBooks";
import { useQuery } from "@tanstack/react-query";
import UserBook from "@/components/UserBook";
import { getUser } from "@/app/actions/user";
import { months } from "@/utils/months";
import BooksByMonth from "@/components/BooksByMonth";
import BooksByYear from "@/components/BooksByYear";
import { useState } from "react";

export default function BookShelf() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUser();
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["user_with_books", user?.id],
    queryFn: () => {
      return getUserBooks();
    },
  });

  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  console.log({ data });

  const classNames = {
    base: "font-medium px-3 hover:bg-gray-100 rounded py-2 px-3",
    active: "bg-gray-100",
  };

  return (
    <div className="grid gap-8">
      <div className="flex items-baseline gap-3 border-b pb-2">
        <button
          type="button"
          className={`${classNames.base} ${view === "monthly" && classNames.active}`}
          onClick={() => setView("monthly")}
        >
          Monthly view
        </button>
        <button
          type="button"
          className={`${classNames.base} ${view === "yearly" && classNames.active}`}
          onClick={() => setView("yearly")}
        >
          Yearly view
        </button>
      </div>

      {data && view === "monthly" && <BooksByMonth data={data} />}
      {data && view === "yearly" && <BooksByYear data={data} />}
    </div>
  );
}
