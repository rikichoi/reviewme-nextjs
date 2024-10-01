import React from "react";
import { locationFilterOptions } from "@/lib/filter-types";
import { filterReviewsSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import prisma from "@/lib/db";

type FilterSidebarProps = {
  query?: string;
  location?: string;
  category?: string;
  verified?: boolean;
  sort?: string;
  order?: string;
  page?: number;
};

type ReviewCategory = {
  category: string;
  count: number;
};

async function filterReviews(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { category, location, query, verified } =
    filterReviewsSchema.parse(values);

  const sort = values.sortBy.toString().split("&")[0];
  const order = values.sortBy.toString().split("&")[1];

  const filterQuery = new URLSearchParams({
    ...(query && { query }),
    ...(location && { location }),
    ...(category && { category }),
    ...(verified && { verified: "true" }),
    ...(order && { order }),
    ...(sort && { sort }),
  });

  redirect(`?${filterQuery}`);
}

export default async function FilterSidebar({
  category,
  location,
  query,
  verified,
  sort,
  order,
  page,
}: FilterSidebarProps) {
  async function getRelevantCategories() {
    const reviewCategories = await prisma.$queryRaw<
      ReviewCategory[]
    >`SELECT category, COUNT(*) as count 
        FROM reviews 
        WHERE verified = true AND location LIKE ${location ? location : "%"}
        GROUP BY category 
        ORDER BY count DESC`;
    return reviewCategories.map((row) => ({
      category: row.category,
      count: Number(row.count),
    }));
  }
  // TODO: dive deeper into unstable cache. learn more about its use cases
  // const getRelevantCategories = unstable_cache(
  //   async () => {
  //     const reviewCategories = await prisma.$queryRaw<ReviewCategory[]>
  //     `SELECT category, COUNT(*) as count
  //       FROM reviews
  //       WHERE verified = true
  //       GROUP BY category
  //       ORDER BY count DESC`;
  //     return reviewCategories.map((row) => ({
  //       category: row.category,
  //       count: Number(row.count),
  //     }));
  //   },
  //   ["relevant_categories"],
  //   {
  //     revalidate: 3 * 60 * 60,
  //   }
  // );

  const defaultSort = `${sort}&${order}`;
  const categories = await getRelevantCategories();
  return (
    <div className="text-xs sm:text-base sticky z-30 top-0 lg:top-4 w-full border-b-2 lg:border-2 p-4 lg:rounded-lg bg-white lg:p-6 lg:w-fit h-fit">
      <form action={filterReviews} className="flex flex-col gap-3">
        <input hidden name="page" value={page} />
        <div className="flex flex-col gap-1">
          <label htmlFor="query" className="font-bold tracking-tight">
            Search
          </label>
          <input
            defaultValue={query}
            id="query"
            name="query"
            className="border-2 rounded-lg p-1"
            placeholder="Title, category, etc..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="sortBy">Sort by</label>
          <select
            className="border border-black p-1 rounded-lg bg-white"
            id="sortBy"
            name="sortBy"
            defaultValue={defaultSort}
          >
            <option value={`createdAt&desc`}>Most Recent</option>
            <option value={`createdAt&asc`}>Oldest</option>
            <option value={`ratingAvg&desc`}>Highest Rated</option>
            <option value={`ratingAvg&asc`}>Lowest Rated</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="font-bold tracking-tight">
            Location
          </label>
          <select
            id="location"
            name="location"
            className="border-2 rounded-lg p-1 bg-white"
            defaultValue={location || "All locations"}
          >
            {locationFilterOptions.map((location) => (
              <option
                key={location}
                value={location.includes("All locations") ? "" : location}
              >
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-bold tracking-tight">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="border-2 rounded-lg p-1 bg-white"
            defaultValue={category || ""}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.category} value={category.category}>
                {category.category} ({category.count})
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            defaultChecked={verified}
            id="verified"
            name="verified"
            type="checkbox"
          ></input>
          <label htmlFor="verified" className="font-bold tracking-tight">
            Verified
          </label>
        </div>
        <FormSubmitButton className="rounded-lg bg-zinc-950 text-white p-2 font-bold tracking-tight">
          Filter reviews
        </FormSubmitButton>
      </form>
    </div>
  );
}
