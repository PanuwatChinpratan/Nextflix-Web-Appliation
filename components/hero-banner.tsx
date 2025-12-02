import { motion } from "framer-motion";
import { Info, Play, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieSummary } from "@/lib/types/movies";
import { SearchPanel } from "./search-panel";

type HeroBannerProps = {
  movie?: MovieSummary;
  isLoading?: boolean;
  playHref?: string;
  infoHref?: string;
};

export function HeroBanner({
  movie,
  isLoading = false,
  playHref,
  infoHref,
}: HeroBannerProps) {
  if (isLoading || !movie) {
    return (
      <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-black">
        <Skeleton className="absolute inset-0 h-full w-full bg-neutral-900" />
      </div>
    );
  }

  return (
    <div
      id="hero"
      className="relative isolate h-[70vh] min-h-[460px] w-full overflow-hidden bg-background text-foreground dark:bg-black dark:text-white sm:h-[75vh]"
    >
      {movie.backdropUrl ? (
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/20 opacity-90 dark:from-[#0f0f0f] dark:via-[#0f0f0f]/40 dark:to-black/10 dark:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent opacity-90 dark:from-black dark:via-black/40 dark:to-transparent" />

      {/* Mobile overlay nav */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:hidden">
        <span className="text-2xl font-black tracking-tight text-[#e50914]">
          N
        </span>
        <div className="flex items-center gap-3 text-white/90">
          <SearchPanel />
          <UserRound className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute left-0 right-0 top-14 z-30 sm:hidden">
        <div className="flex justify-center gap-8 text-sm font-semibold text-white drop-shadow">
          <Link
            href="#hero"
            className="transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            TV Shows
          </Link>
          <Link
            href="#popular"
            className="transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Movies
          </Link>
          <Link
            href="#my-list"
            className="transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Categories
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-5 px-4 pb-20 pt-24 sm:px-10 lg:pb-24">
        <motion.div
          className="space-y-3 drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#e50914]">
            N Series
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>
          <p className="text-sm font-semibold text-foreground/80 dark:text-white/85 sm:text-base">
            #1 in TV Shows Today
          </p>
          <p className="line-clamp-3 max-w-3xl text-sm text-foreground/80 dark:text-white/85 sm:line-clamp-4 sm:text-lg">
            {movie.overview}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {playHref && (
            <Button
              size="lg"
              className="w-full justify-center bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 sm:w-auto"
              aria-label={`Play ${movie.title}`}
              asChild
            >
              <Link href={playHref}>
                <Play className="h-5 w-5" />
                Play
              </Link>
            </Button>
          )}
          {infoHref && (
            <Button
              size="lg"
              variant="secondary"
              className="w-full justify-center bg-black/10 text-foreground backdrop-blur hover:bg-black/15 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 sm:w-auto"
              aria-label={`More info about ${movie.title}`}
              asChild
            >
              <Link href={infoHref}>
                <Info className="h-5 w-5" />
                More Info
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
