"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Loader2, Search, X } from "lucide-react";

import { MovieCard, MovieCardSkeleton } from "@/components/movie-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchMovies } from "@/lib/hooks/use-movies";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SearchPanel() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isClient = useSyncExternalStore(
    (onStoreChange) => {
      onStoreChange();
      return () => {};
    },
    () => true,
    () => false,
  );

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 220);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setDebouncedQuery("");
    }
  };

  const {
    data,
    isFetching,
    isError,
    isLoading: isInitialLoading,
  } = useSearchMovies(debouncedQuery);

  const movies = data?.results ?? [];
  const isLoading = isInitialLoading || isFetching;
  const showResults = debouncedQuery.length > 0;

  const titleText = useMemo(() => {
    if (!debouncedQuery) return t("search.action");
    return t("search.results", { query: debouncedQuery });
  }, [debouncedQuery, t]);

  if (!isClient) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={t("search.action")}
        aria-disabled
        disabled
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={t("search.action")}
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className={cn(
          "max-h-[80vh] overflow-hidden border-b px-0 pb-4 pt-5 text-foreground shadow-2xl",
          "bg-[radial-gradient(circle_at_18%_10%,rgba(229,9,20,0.14),transparent_32%),radial-gradient(circle_at_82%_0,rgba(0,0,0,0.06),transparent_36%),linear-gradient(to_bottom,#f8f8f8,#ededed_55%,#f8f8f8)]",
          "dark:border-white/5 dark:text-white dark:bg-[radial-gradient(circle_at_18%_10%,rgba(229,9,20,0.18),transparent_32%),radial-gradient(circle_at_82%_0,rgba(255,255,255,0.08),transparent_38%),linear-gradient(to_bottom,#0c0c0c,#050505_55%,#0c0c0c)]",
        )}
      >
        <SheetHeader className="gap-2 px-5">
          <SheetTitle className="text-base font-semibold tracking-tight text-foreground dark:text-white">
            {titleText}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {t("search.tip")}
          </SheetDescription>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="group relative mt-1 flex items-center gap-2 rounded-xl border border-black/5 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-0 dark:border-white/10 dark:bg-white/5"
          >
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search.placeholder")}
              className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="inline-flex items-center justify-center rounded-md p-1 text-muted-foreground transition hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </form>
        </SheetHeader>

        <ScrollArea className="mt-2 h-full px-5 pb-4">
          {!showResults && (
            <div className="rounded-xl border border-dashed border-black/10 bg-white/70 px-4 py-6 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <p className="font-semibold text-foreground dark:text-white">
                {t("search.action")}
              </p>
              <p>{t("search.placeholder")}</p>
            </div>
          )}

          {showResults && isError && (
            <div className="rounded-xl border border-red-200/70 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-400/30 dark:bg-red-950/40 dark:text-red-200">
              Unable to fetch results right now. Please try again.
            </div>
          )}

          {showResults && isLoading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>
          )}

          {showResults && !isLoading && !isError && (
            <>
              {movies.length === 0 ? (
                <div className="rounded-xl border border-black/5 bg-white/70 px-4 py-5 text-sm text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  No titles match “{debouncedQuery}”. Try another search.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      href={`/movies/${movie.id}`}
                      onNavigate={() => handleOpenChange(false)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {isLoading && showResults && (
            <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Searching titles...
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
