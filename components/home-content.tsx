"use client";

import { useMemo } from "react";

import { HeroBanner } from "@/components/hero-banner";
import { FavoritesRow } from "@/components/favorites-row";
import { MovieRow } from "@/components/movie-row";
import { SiteHeader } from "@/components/site-header";
import { usePopularMovies, useTrendingMovies } from "@/lib/hooks/use-movies";
import type { PaginatedMovies, MovieSummary } from "@/lib/types/movies";

type HomeContentProps = {
  initialHero?: MovieSummary;
  initialTrending?: PaginatedMovies;
  initialPopular?: PaginatedMovies;
};

export function HomeContent({
  initialHero,
  initialTrending,
  initialPopular,
}: HomeContentProps) {
  const { data: trending, isLoading: trendingLoading } = useTrendingMovies(
    1,
    initialTrending
  );
  const {
    data: popular,
    isLoading: popularLoading,
    isError: popularError,
  } = usePopularMovies(1, initialPopular);

  const hero = useMemo(() => {
    if (initialHero) return initialHero;

    const pool = [...(trending?.results ?? []), ...(popular?.results ?? [])];
    if (pool.length === 0) return undefined;

    // Deterministically vary the hero pick without impure randomness.
    const seed = pool.reduce(
      (sum, movie, idx) => sum + movie.id * (idx + 1),
      0
    );
    const index = seed % pool.length;

    return pool[index];
  }, [initialHero, popular?.results, trending?.results]);

  const heroLoading = trendingLoading && !hero;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(0,0,0,0.08),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(0,0,0,0.06),transparent_28%),linear-gradient(to_bottom,#f7f7f7,#eaeaea_45%,#f7f7f7)] text-foreground dark:bg-linear-to-b dark:from-black dark:via-neutral-950 dark:to-black">
      <SiteHeader />
      <main className="flex flex-col bg-[radial-gradient(circle_at_40%_-10%,rgba(0,0,0,0.08),transparent_38%),radial-gradient(circle_at_80%_-5%,rgba(0,0,0,0.06),transparent_32%)] dark:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.5),rgba(0,0,0,0.15)_55%,rgba(0,0,0,0)_75%)]">
        <HeroBanner
          movie={hero}
          isLoading={heroLoading}
          playHref={hero ? `/movies/${hero.id}` : undefined}
          infoHref={hero ? `/movies/${hero.id}` : undefined}
        />

        <section
          id="popular"
          className="relative z-20 -mt-8 px-4 pb-10 sm:px-8 lg:pl-12"
        >
          <MovieRow
            title="Popular on Netflix"
            movies={popular?.results}
            isLoading={popularLoading}
            isError={popularError}
            fallback={
              <div className="px-3 py-6 text-sm text-foreground/60 dark:text-white/70">
                {popularError
                  ? "Unable to load titles right now."
                  : "No titles found."}
              </div>
            }
            cardLink={(movie) => `/movies/${movie.id}`}
          />
        </section>

        <section
          id="my-list"
          className="relative z-20 mt-4 px-4 pb-12 sm:px-8 lg:px-12"
        >
          <FavoritesRow />
        </section>
      </main>
    </div>
  );
}
