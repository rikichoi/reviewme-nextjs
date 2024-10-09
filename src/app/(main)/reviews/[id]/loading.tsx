import { Skeleton } from "@/components/ui/skeleton"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-items-center mb-10">
      <div className="bg-white border-b min-h-40 w-full p-2 sticky top-0 md:static">
        <div className="grid grid-cols-3 gap-5 p-5 max-w-5xl mx-auto">
          <div className="items-center w-fit flex">
            <Skeleton className="h-24 w-24 rounded" />
          </div>
          <div className="col-span-2 space-y-3">
            <div className="flex flex-col">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center mt-2">
                <Skeleton className="h-6 w-32 mr-2" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse gap-5 md:max-w-5xl md:mx-auto md:flex-row grow px-10 md:px-5 pt-0 md:pt-5">
        <div className="flex-1 flex flex-col gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-64">
          <div className="border bg-white rounded-lg flex items-center mb-2 p-5">
            <div className="flex items-center flex-col gap-2 py-5 flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-3/4 mb-4" />
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-3/4 mb-4" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="space-y-3 w-full mt-4">
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}