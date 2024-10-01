import { Skeleton } from "@/components/ui/skeleton"

export default function ReviewListLoading() {
  return (
    <div className="grow gap-3 lg:px-0 px-5 flex flex-col">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-48" />
      </div>
      {[...Array(6)].map((_, index) => (
        <ReviewItemSkeleton key={index} />
      ))}
    </div>
  )
}

function ReviewItemSkeleton() {
  return (
    <div className="bg-white border-2 min-h-40 rounded-lg">
      <div className="grid grid-cols-3 gap-5 p-5 border-b-2 max-h-32">
        <div className="items-center flex">
          <Skeleton className="h-24 w-24 rounded" />
        </div>
        <div className="col-span-2 space-y-3">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}