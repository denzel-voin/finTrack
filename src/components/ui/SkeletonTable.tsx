import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-4 w-84" />
          <Skeleton className="h-4 w-84" />
          <Skeleton className="h-4 w-84" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
