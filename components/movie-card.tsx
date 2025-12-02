"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import type { MovieSummary } from "@/lib/types/movies";
import { useFavorites } from "@/lib/hooks/use-favorites";

type MovieCardProps = {
  movie: MovieSummary;
  href?: string;
  onNavigate?: () => void;
};

export function MovieCard({ movie, href, onNavigate }: MovieCardProps) {
  const targetHref = href ?? `/movies/${movie.id}`;
  const {
    isFavorite,
    toggleFavorite,
    isMutating: favoritesBusy,
  } = useFavorites("guest");

  const saved = isFavorite(movie.id);

  return (
    <div className="group relative block h-40 w-28 overflow-hidden rounded-lg bg-gradient-to-br from-white via-white to-neutral-50 text-left shadow-md shadow-black/10 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:h-48 sm:w-32 lg:h-52 lg:w-36 dark:bg-card dark:from-card dark:via-card dark:to-card dark:shadow-black/40 dark:ring-white/5">
      <Link
        href={targetHref}
        className="absolute inset-0 z-20"
        onClick={onNavigate}
      >
        <span className="sr-only">Open {movie.title}</span>
      </Link>

      {movie.posterUrl ? (
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          sizes="(min-width: 1024px) 12vw, 40vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-sm text-foreground/70">
          {movie.title}
        </div>
      )}

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(movie);
        }}
        className="absolute right-1 top-1 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white shadow-md transition hover:bg-white hover:text-black"
        aria-label={saved ? "Remove from My List" : "Add to My List"}
        disabled={favoritesBusy}
      >
        {saved ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="absolute bottom-2 left-2 right-2 line-clamp-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {movie.title}
      </p>
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="h-40 w-28 rounded-lg bg-gradient-to-br from-white via-white to-neutral-50 ring-1 ring-black/5 sm:h-48 sm:w-32 lg:h-52 lg:w-36 dark:from-muted dark:via-muted dark:to-muted dark:ring-white/5">
      <Skeleton className="h-full w-full rounded-lg bg-gradient-to-br from-white via-white to-neutral-50 dark:from-muted dark:via-muted dark:to-muted" />
    </div>
  );
}
