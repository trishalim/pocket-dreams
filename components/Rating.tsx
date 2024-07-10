import StarIcon from "@/components/icons/StarIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";

export default function Rating({ rating }: { rating: number | null }) {
  const max = 5;
  const outline = max - (rating || 0);
  return (
    <div className="flex gap-2 text-lg text-yellow-400">
      {rating && [...Array(rating)].map((x, i) => <StarIcon key={i} />)}
      {[...Array(outline)].map((x, i) => (
        <StarOutlineIcon key={i} />
      ))}
    </div>
  );
}
