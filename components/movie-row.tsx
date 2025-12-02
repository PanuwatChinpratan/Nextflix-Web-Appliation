import type { ReactNode } from "react";

import type { MovieSummary } from "@/lib/types/movies";

import { MovieCard, MovieCardSkeleton } from "./movie-card";

type MovieRowProps = {
  title: string;
  movies?: MovieSummary[];
  isLoading?: boolean;
  isError?: boolean;
  fallback?: ReactNode;
  cardLink?: (movie: MovieSummary) => string;
};

export function MovieRow({
  title,
  movies,
  isLoading,
  isError,
  fallback,
  cardLink,
}: MovieRowProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold text-foreground drop-shadow-sm">
          {title}
        </h2>
      </div>

      <div className="relative overflow-hidden backdrop-blur-lg dark:border-white/5 dark:from-neutral-900 dark:via-neutral-900/80 dark:to-neutral-950">
        <div
          className="flex gap-3 overflow-x-auto overflow-y-hidden overscroll-contain snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="snap-start">
                <MovieCardSkeleton />
              </div>
            ))}
          {!isLoading && isError && (
            <div className="flex h-24 items-center text-sm text-red-400">
              Failed to load. Try again.
            </div>
          )}
          {!isLoading &&
            !isError &&
            (movies?.length ?? 0) === 0 &&
            (fallback ?? (
              <div className="flex h-24 items-center text-sm text-white/70">
                No movies found.
              </div>
            ))}
          {!isLoading &&
            !isError &&
            movies?.map((movie) => (
              <div key={movie.id} className="snap-start">
                <MovieCard movie={movie} href={cardLink?.(movie)} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
