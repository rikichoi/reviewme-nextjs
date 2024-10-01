import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingTemplate() {
  return (
    <main className="flex flex-col items-center justify-items-center mb-10">
      <div className="flex lg:flex-col items-center gap-3 w-full justify-center py-10 bg-white border-b">
        <Skeleton className="h-10 w-64 sm:w-96 lg:w-[500px]" />
        <div className="hidden lg:flex items-center gap-2">
          <Skeleton className="h-6 w-80" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 lg:max-w-7xl lg:mx-auto lg:flex-row grow lg:px-5 pt-0 lg:pt-5">
        {/* FilterSidebar skeleton */}
        <div className="lg:w-1/4">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
        {/* ReviewListItem skeleton */}
        <div className="lg:w-3/4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* PaginationBar skeleton */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </main>
  )
}