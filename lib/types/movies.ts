export type MovieSummary = {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string | null;
  rating: number;
  genres: string[];
};

export type MovieDetail = MovieSummary & {
  runtime: number | null;
  tagline: string | null;
  homepage: string | null;
};

export type PaginatedMovies = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: MovieSummary[];
};
