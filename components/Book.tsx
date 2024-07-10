import { Book } from "@/interfaces/Book";

export default function Book({ title, author }: Book) {
  return (
    <div className="rounded border p-3">
      <div className="font-semibold">{title}</div>
      <p>{author}</p>
    </div>
  );
}
