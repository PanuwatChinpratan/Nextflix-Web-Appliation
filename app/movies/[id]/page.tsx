"use client";

import { useMemo } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieDetail } from "@/lib/hooks/use-movies";
import Image from "next/image";

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = useMemo(
    () => Number(Array.isArray(params?.id) ? params?.id[0] : params?.id),
    [params]
  );
  const { data, isLoading, isError } = useMovieDetail(movieId);

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p className="text-lg font-semibold">Unable to load this title.</p>
        <Link href="/" className="mt-4 text-red-400 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-16 md:px-8">
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {!isLoading && data && (
          <>
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-white/10">
              {data.backdropUrl ? (
                <Image
                  src={data.backdropUrl}
                  alt={data.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-[320px] items-center justify-center bg-neutral-900">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold">{data.title}</h1>
                <Badge className="bg-white/10 text-white">
                  ⭐ {data.rating.toFixed(1)}
                </Badge>
                {data.runtime && (
                  <Badge className="bg-white/10 text-white">
                    {data.runtime} min
                  </Badge>
                )}
              </div>
              {data.tagline && (
                <p className="text-lg text-white/80">“{data.tagline}”</p>
              )}
              <p className="text-white/80">{data.overview}</p>
              <div className="flex flex-wrap gap-2 text-sm text-white/70">
                {data.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/10 px-2 py-1"
                  >
                    {genre}
                  </span>
                ))}
                {data.releaseDate && (
                  <span className="rounded-full bg-white/10 px-2 py-1">
                    {data.releaseDate}
                  </span>
                )}
                {data.homepage && (
                  <Link
                    href={data.homepage}
                    target="_blank"
                    className="rounded-full bg-white/10 px-2 py-1 text-red-300 underline"
                  >
                    Official site
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
