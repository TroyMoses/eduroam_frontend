import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Skeleton className="h-12 w-[250px] mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
      </div>

      <Skeleton className="h-[400px] rounded-xl mt-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-xl" />
          ))}
      </div>
    </div>
  );
}
