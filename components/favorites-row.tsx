"use client";

import { MovieRow } from "@/components/movie-row";
import { useFavorites } from "@/lib/hooks/use-favorites";

export function FavoritesRow() {
  const { favorites, isLoading, isError } = useFavorites("guest");

  const movies = favorites.map((favorite) => ({
    id: favorite.movieId,
    title: favorite.title,
    overview: "",
    posterUrl: favorite.posterUrl ?? null,
    backdropUrl: favorite.posterUrl ?? null,
    releaseDate: null,
    rating: 0,
    genres: [],
  }));

  return (
    <MovieRow
      title="My List"
      movies={movies}
      isLoading={isLoading}
      isError={isError}
      fallback={
        <div className="rounded-lg border border-black/5 bg-white/70 px-4 py-6 text-sm text-foreground/60 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-neutral-900/60 dark:text-white/70">
          {isError ? "Unable to load your list right now." : "No titles saved yet."}
        </div>
      }
      cardLink={(movie) => `/movies/${movie.id}`}
    />
  );
}
