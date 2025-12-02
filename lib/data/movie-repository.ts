import {
  fetchMovieDetail,
  fetchPopularMovies,
  fetchTrendingMovies,
  searchMovies,
} from "../api-client";
import type { MovieRepository } from "../domain/movies";

export function createMovieRepository(): MovieRepository {
  return {
    getTrending: (page = 1) => fetchTrendingMovies(page),
    getPopular: (page = 1) => fetchPopularMovies(page),
    search: (query, page = 1) => searchMovies(query, page),
    getDetail: (id) => fetchMovieDetail(id),
  };
}
