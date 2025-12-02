import { HomeContent } from "@/components/home-content";
import { movieUseCases } from "@/lib/use-cases/movies";
import type { MovieSummary, PaginatedMovies } from "@/lib/types/movies";

export const revalidate = 300;

function pickRandom<T>(items: T[]): T | undefined {
  if (!items.length) return undefined;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function shuffledResults(list?: PaginatedMovies): PaginatedMovies | undefined {
  if (!list?.results) return list;
  const results = [...list.results];
  for (let i = results.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }
  return { ...list, results };
}

export default async function Home() {
  const [trending, popular] = await Promise.all([
    movieUseCases.getTrending().catch(() => undefined),
    movieUseCases.getPopular().catch(() => undefined),
  ]);

  const heroCandidates: MovieSummary[] = [
    ...(trending?.results ?? []),
    ...(popular?.results ?? []),
  ];
  const initialHero =
    pickRandom(heroCandidates) ??
    trending?.results?.[0] ??
    popular?.results?.[0];

  return (
    <HomeContent
      initialHero={initialHero}
      initialTrending={trending}
      initialPopular={shuffledResults(popular)}
    />
  );
}
