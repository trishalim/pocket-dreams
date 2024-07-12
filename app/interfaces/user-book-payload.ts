export interface UserBookPayload {
  book_id: bigint;
  review: string | null;
  rating: number | null;
  read_at: Date;
}
