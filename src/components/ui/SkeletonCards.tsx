import { Skeleton } from "./skeleton";

export function SkeletonCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
      <Skeleton className="rounded-xl w-full h-24" />
      <Skeleton className="rounded-xl w-full h-24" />
      <Skeleton className="rounded-xl w-full h-24" />
    </div>
  );
}
