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

  const classNames = {
    base: "font-medium px-3 hover:bg-gray-100 rounded py-2 px-3",
    active: "bg-gray-100",
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 border-b pb-2">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold">
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
        {data && <Stats data={data} />}
      </div>
      <div className="flex items-baseline justify-between gap-3 border-b pb-2">
        <div className="flex gap-3">
          <Button
            variant="tertiary"
            type="button"
            className={`${classNames.base} ${view === "monthly" && classNames.active}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant="tertiary"
            type="button"
            className={`${classNames.base} ${view === "yearly" && classNames.active}`}
            onClick={() => setView("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>

      {data && view === "monthly" && <BooksByMonth data={data} />}
      {data && view === "yearly" && <BooksByYear data={data} />}
    </>
  );
}
