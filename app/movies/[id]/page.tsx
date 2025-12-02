import { notFound } from "next/navigation";

import { MovieDetailView } from "@/components/movie-detail-view";
import { movieUseCases } from "@/lib/use-cases/movies";

export const revalidate = 300;

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps) {
  const id = Number(params.id);
  if (Number.isNaN(id)) return { title: "Movie not found" };

  try {
    const movie = await movieUseCases.getDetail(id);
    return { title: `${movie.title} | Nextflix` };
  } catch {
    return { title: "Movie unavailable" };
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    notFound();
  }

  let movie;
  try {
    movie = await movieUseCases.getDetail(id);
  } catch (error) {
    console.error("Failed to load movie detail", error);
  }

  if (!movie) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center text-foreground/70">
        Unable to load this title. Please try again later.
      </div>
    );
  }

  return <MovieDetailView movie={movie} />;
}
