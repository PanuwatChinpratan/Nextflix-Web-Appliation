import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMovie() {
  return (
    <div className="relative isolate min-h-[75vh] overflow-hidden bg-black text-white">
      <Skeleton className="absolute inset-0 h-full w-full bg-neutral-900" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-5 py-20 lg:py-28">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-12 w-3/4 bg-white/15" />
          <Skeleton className="h-5 w-2/3 bg-white/10" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 bg-white/10" />
            <Skeleton className="h-8 w-20 bg-white/10" />
            <Skeleton className="h-8 w-24 bg-white/10" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 w-32 bg-white/15" />
          <Skeleton className="h-12 w-40 bg-white/15" />
        </div>
      </div>
    </div>
  );
}
