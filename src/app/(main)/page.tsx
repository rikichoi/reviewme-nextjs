import FilterSidebar from "@/components/FilterSidebar";
import { PaginationBar } from "@/components/PaginationBar";
import ReviewListItem from "@/components/ReviewListItem";
import prisma from "@/lib/db";

type HomeProps = {
  searchParams: {
    query?: string;
    location?: string;
    category?: string;
    verified?: boolean;
    sort?: string;
    order?: string;
    page: string;
  };
};

export default async function Home({
  searchParams: {
    category,
    location,
    query,
    verified,
    sort,
    order,
    page = "1",
  },
}: HomeProps) {
  const currentPage = parseInt(page);

  const totalItemCount = await prisma.reviews.count({
    where: { verified: true },
  });
  const pageSize = 6;

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return (
    <main className="flex flex-col items-center justify-items-center mb-10 ">
      <div className="flex lg:flex-col items-center gap-3 w-full justify-center p-12 bg-white border-b">
        <h1 className="text-3xl lg:text-5xl tracking-tighter font-bold">
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="hidden border-2 group-hover:flex z-40 flex-col grow right-0 bg-white p-4 min-w-96 absolute gap-3 rounded-lg drop-shadow-xl mt-1">
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
      <div className="w-full flex flex-col gap-5 lg:max-w-7xl lg:mx-auto lg:flex-row grow lg:px-5 pt-0 lg:pt-5">
        <FilterSidebar
          category={category}
          location={location}
          query={query}
          verified={verified}
          sort={sort}
          order={order}
        />
        <ReviewListItem
          page={page}
          category={category}
          location={location}
          query={query}
          verified={verified}
          sort={sort}
          order={order}
        />
      </div>
      {/* TODO: ADD PAGINATION VERY IMPORTANT!!! */}
      <PaginationBar currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
