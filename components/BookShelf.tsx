"use client";

import { getUserBooks, getYears } from "@/app/actions/userBooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/app/actions/user";
import BooksByMonth from "@/components/BooksByMonth";
import BooksByYear from "@/components/BooksByYear";
import { useState } from "react";
import Link from "next/link";
import Stats from "@/components/Stats";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import BooksIcon from "@/components/icons/BooksIcon";
import BookOpenIcon from "@/components/icons/BookOpenIcon";

export default function BookShelf({ year }: { year: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState(year);
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const supabase = createClient();

      return supabase.auth.getUser().then((res) => res.data.user);
    },
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["user_with_books", user?.id, selectedYear],
    queryFn: () => {
      return getUserBooks(selectedYear);
    },
    enabled: !!user,
  });

  const { data: years } = useQuery({
    queryKey: ["years", user?.id],
    queryFn: async () => {
      const res = await getYears();
      return res?.data;
    },
    enabled: !!user,
  });

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    queryClient.invalidateQueries({
      queryKey: ["user_with_books", user?.id, e.target.value],
    });
    setSelectedYear(parseInt(e.target.value));
    router.push(`/?year=${e.target.value}`);
  };

  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return <>Loading books...</>;
  }

  if (!data?.byMonth?.length) {
    return (
      <Container className="grid gap-3 justify-center">
        <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto" />
        <h2 className="text-center md:text-lg text-gray-500 mb-5">
          You haven&apos;t added any books yet.
        </h2>
      </Container>
    );
  }

  const classNames = {
    base: "font-medium py-2 px-3 border-b-2",
    active: "border-purple-400 text-purple-400",
    inactive: "border-transparent hover:border-purple-400 text-purple-100/50",
  };

  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="font-serif text-white text-2xl md:text-3xl font-semibold">
          Books read in {selectedYear}
        </h1>

        {years && years.length > 1 ? (
          <select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year.year} value={year.year}>
                {year.year}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-64 grid gap-10">
        {data && <Stats data={data} />}
        <div className="flex gap-3 border-b border-white/10 -mb-x">
          <button
            type="button"
            className={`${classNames.base} ${view === "monthly" ? classNames.active : classNames.inactive}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${classNames.base} ${view === "yearly" ? classNames.active : classNames.inactive}`}
            onClick={() => setView("yearly")}
          >
            Yearly
          </button>
        </div>

        {data && view === "monthly" && <BooksByMonth data={data} />}
        {data && view === "yearly" && <BooksByYear data={data} />}
      </div>
    </>
  );
}
