"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { favoritesApi } from "../api-client";
import type { FavoritePayload } from "../types/favorites";
import type { MovieSummary } from "../types/movies";

export function useFavorites(userId = "guest") {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => favoritesApi.list(userId),
    staleTime: 60_000,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: FavoritePayload) => favoritesApi.save(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (movieId: number) => favoritesApi.remove(movieId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const isFavorite = (movieId: number) =>
    favoritesQuery.data?.some((fav) => fav.movieId === movieId) ?? false;

  const toggleFavorite = async (movie: MovieSummary) => {
    if (isFavorite(movie.id)) {
      await removeMutation.mutateAsync(movie.id);
    } else {
      const payload: FavoritePayload = {
        userId,
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl ?? movie.backdropUrl ?? undefined,
      };
      await saveMutation.mutateAsync(payload);
    }
  };

  return {
    favorites: favoritesQuery.data ?? [],
    isFavorite,
    toggleFavorite,
    isLoading: favoritesQuery.isLoading,
    isError: favoritesQuery.isError,
    isMutating: saveMutation.isPending || removeMutation.isPending,
  };
}
