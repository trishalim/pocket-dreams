"use client";

import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import StarIcon from "@/components/icons/StarIcon";
import { useState } from "react";

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingInput({ value, onChange }: RatingInputProps) {
  const handleChange = (newRating: number) => {
    console.log({ newRating });
    onChange(newRating);
  };

  return (
    <div className="flex gap-0.5 text-lg text-yellow-400">
      {[...Array(5)].map((_, i) => {
        return i < value ? (
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => handleChange(i + 1)}
            key={i}
          >
            <StarIcon />
          </button>
        ) : (
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => handleChange(i + 1)}
            key={i}
          >
            <StarOutlineIcon />
          </button>
        );
      })}
    </div>
  );
}
