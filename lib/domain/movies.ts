import type { MovieDetail, PaginatedMovies } from "../types/movies";

export type MovieRepository = {
  getTrending(page?: number): Promise<PaginatedMovies>;
  getPopular(page?: number): Promise<PaginatedMovies>;
  search(query: string, page?: number): Promise<PaginatedMovies>;
  getDetail(id: number): Promise<MovieDetail>;
};

export function createMovieUseCases(repository: MovieRepository) {
  return {
    getTrending: (page = 1) => repository.getTrending(page),
    getPopular: (page = 1) => repository.getPopular(page),
    search: (query: string, page = 1) => repository.search(query, page),
    getDetail: (id: number) => repository.getDetail(id),
  };
}

export type MovieUseCases = ReturnType<typeof createMovieUseCases>;
