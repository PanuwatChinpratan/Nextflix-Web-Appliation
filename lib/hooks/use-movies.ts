"use client";

import { useQuery } from "@tanstack/react-query";

import {
  fetchMovieDetail,
  fetchPopularMovies,
  fetchTrendingMovies,
  searchMovies,
} from "../api-client";
import type { MovieDetail, PaginatedMovies } from "../types/movies";

const defaultQueryConfig = {
  staleTime: 60_000,
  refetchOnReconnect: true,
};

export const useTrendingMovies = (
  page = 1,
  initialData?: PaginatedMovies,
) =>
  useQuery<PaginatedMovies>({
    queryKey: ["movies", "trending", page],
    queryFn: () => fetchTrendingMovies(page),
    initialData,
    ...defaultQueryConfig,
  });

export const usePopularMovies = (page = 1, initialData?: PaginatedMovies) =>
  useQuery<PaginatedMovies>({
    queryKey: ["movies", "popular", page],
    queryFn: () => fetchPopularMovies(page),
    initialData,
    ...defaultQueryConfig,
  });

export const useSearchMovies = (query: string, page = 1) =>
  useQuery<PaginatedMovies>({
    queryKey: ["movies", "search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
    ...defaultQueryConfig,
  });

export const useMovieDetail = (id?: number) =>
  useQuery<MovieDetail>({
    queryKey: ["movies", "detail", id],
    queryFn: () => fetchMovieDetail(id ?? 0),
    enabled: Boolean(id),
    ...defaultQueryConfig,
  });
