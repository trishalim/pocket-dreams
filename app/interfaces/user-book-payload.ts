export interface UserBookPayload {
  book_id: string;
  review: string | null;
  rating: number | null;
  read_at: Date;
}
