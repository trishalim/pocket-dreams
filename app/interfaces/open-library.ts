export interface OpenLibrarySearchResponse {
  start: number;
  num_found: number;
  docs: BookDocument[];
}

export interface BookDocument {
  cover_i?: number;
  has_fulltext: boolean;
  edition_count: number;
  title: string;
  title_sort: string;
  author_name: string[];
  first_publish_year: number;
  number_of_pages_median: number;
  cover_edition_key: string;
  key: string;
  ia?: string[];
  author_key: string[];
  public_scan_b: boolean;
}
