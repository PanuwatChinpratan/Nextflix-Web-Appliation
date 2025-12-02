import axios from "axios";

import { Favorite, FavoritePayload } from "./types/favorites";
import { MovieDetail, PaginatedMovies } from "./types/movies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  timeout: 10_000,
});

export const fetchTrendingMovies = async (
  page = 1,
): Promise<PaginatedMovies> => {
  const { data } = await api.get<PaginatedMovies>("/movies/trending", {
    params: { page },
  });
  return data;
};

export const fetchPopularMovies = async (
  page = 1,
): Promise<PaginatedMovies> => {
  const { data } = await api.get<PaginatedMovies>("/movies/popular", {
    params: { page },
  });
  return data;
};

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<PaginatedMovies> => {
  const { data } = await api.get<PaginatedMovies>("/movies/search", {
    params: { query, page },
  });
  return data;
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const { data } = await api.get<MovieDetail>(`/movies/${id}`);
  return data;
};

export const favoritesApi = {
  async list(userId = "guest"): Promise<Favorite[]> {
    const { data } = await api.get<Favorite[]>("/favorites", {
      params: { userId },
    });
    return data;
  },
  async save(payload: FavoritePayload): Promise<Favorite> {
    const { data } = await api.post<Favorite>("/favorites", payload);
    return data;
  },
  async remove(movieId: number, userId = "guest"): Promise<void> {
    await api.delete(`/favorites/${movieId}`, { params: { userId } });
  },
};

export { api as httpClient };
