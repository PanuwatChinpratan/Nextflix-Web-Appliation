"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink, Play, Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/hooks/use-favorites";
import type { MovieDetail } from "@/lib/types/movies";

type MovieDetailViewProps = {
  movie: MovieDetail;
};

export function MovieDetailView({ movie }: MovieDetailViewProps) {
  const { isFavorite, toggleFavorite, isMutating } = useFavorites("guest");
  const saved = isFavorite(movie.id);

  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  const runtimeLabel =
    typeof movie.runtime === "number" && movie.runtime > 0
      ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
      : null;

  return (
    <div className="relative isolate min-h-[75vh] overflow-hidden bg-black text-white">
      {movie.backdropUrl && (
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/95" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-5 py-20 lg:flex-row lg:items-end lg:gap-10 lg:py-28">
        <div className="space-y-4 lg:flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e50914]">
            N Series
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {movie.title}
          </h1>
          <p className="text-base text-white/80 sm:text-lg lg:text-xl">
            {movie.tagline || movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            {year && <span className="rounded-full bg-white/10 px-3 py-1">{year}</span>}
            {runtimeLabel && (
              <span className="rounded-full bg-white/10 px-3 py-1">
                {runtimeLabel}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {movie.rating.toFixed(1)}
            </span>
            {movie.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="min-w-[140px] bg-white text-black hover:bg-white/90"
            aria-label={`Play ${movie.title}`}
            asChild={Boolean(movie.homepage)}
            disabled={!movie.homepage}
          >
            {movie.homepage ? (
              <Link href={movie.homepage} target="_blank" rel="noreferrer">
                <Play className="h-5 w-5" />
                Play
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Play className="h-5 w-5" />
                Play
              </span>
            )}
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="min-w-[160px] bg-white/15 text-white hover:bg-white/20"
            onClick={() => toggleFavorite(movie)}
            disabled={isMutating}
            aria-label={saved ? "Remove from My List" : "Add to My List"}
          >
            {saved ? (
              <span className="inline-flex items-center gap-2">
                <Check className="h-5 w-5" />
                In My List
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add to My List
              </span>
            )}
          </Button>

          {movie.homepage && (
            <Link
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              Official Site <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 text-base text-white/80 lg:px-6">
        <p className="leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
}
