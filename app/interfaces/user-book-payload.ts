export interface UserBookPayload {
  book_id: bigint;
  review: string;
  rating: number;
  read_at: Date;
}
