import { Skeleton } from "./ui/Skeleton"

export function SkeletonCard() {
  return (
    <div className="card-premium h-full animate-pulse">
      <div className="aspect-property bg-white/10" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/10 rounded-md w-3/4" />
        <div className="h-4 bg-white/10 rounded-md w-full" />
        <div className="flex justify-between">
          <div className="h-5 bg-white/10 rounded-md w-20" />
          <div className="h-5 bg-white/10 rounded-md w-20" />
          <div className="h-5 bg-white/10 rounded-md w-20" />
        </div>
        <div className="h-8 bg-white/10 rounded-md w-1/3 pt-4" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
