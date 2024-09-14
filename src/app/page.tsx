import FilterSidebar from "@/components/FilterSidebar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-items-center min-h-[2000px] ">
      <div className="flex lg:flex-col items-center gap-3 w-full justify-center p-12 bg-white">
        <h1 className="text-3xl lg:text-5xl tracking-tight font-bold">
          Best in Review Site
        </h1>
        <div className="group relative">
          <div className="flex items-center gap-2">
            <span className="pointer-events-none text-lg hidden lg:block text-zinc-600">
              Compare the best companies in this category
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="hidden border-2 group-hover:flex flex-col grow right-0 bg-white p-4 min-w-96 absolute gap-3 rounded-lg drop-shadow-xl mt-1">
            <p className="text-xs">
              Companies on ReviewMe can choose relevant categories to describe
              their industry, products, or services.
            </p>
            <p className="text-xs">
              All companies in a category are eligible to be best in that
              category if they’re actively asking for reviews and have received
              25 or more reviews in the last 12 months.
            </p>
            <p className="text-xs">
              Some companies on ReviewMe aren’t eligible to be best in a
              category, and others aren’t on ReviewMe at all.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:max-w-7xl lg:mx-auto lg:flex-row">
        <FilterSidebar />
      </div>
    </main>
  );
}
