"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { MovieSummary } from "@/lib/types/movies";

type WatchlistState = {
  items: MovieSummary[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  add: (movie: MovieSummary) => void;
  remove: (movieId: number) => void;
  toggle: (movie: MovieSummary) => void;
  isSaved: (movieId: number) => boolean;
};

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
      add: (movie) =>
        set((state) => ({
          items: [movie, ...state.items.filter((item) => item.id !== movie.id)],
        })),
      remove: (movieId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== movieId),
        })),
      toggle: (movie) => {
        const alreadySaved = get().isSaved(movie.id);
        if (alreadySaved) {
          get().remove(movie.id);
        } else {
          get().add(movie);
        }
      },
      isSaved: (movieId) => get().items.some((item) => item.id === movieId),
    }),
    {
      name: "nextflix-watchlist",
      skipHydration: false,
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          state?.setHasHydrated(true);
        }
      },
    },
  ),
);
