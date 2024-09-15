import React from "react";
import {
  categoryFilterOptions,
  locationFilterOptions,
} from "@/lib/filter-types";
import { filterReviewsSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

async function filterReviews(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { category, location, query, verified } =
    filterReviewsSchema.parse(values);

  const filterQuery = new URLSearchParams({
    ...(query && { query }),
    ...(location && { location }),
    ...(category && { category }),
    ...(verified && { verified: "true" }),
  });

  redirect(`?${filterQuery}`);
}

export default async function FilterSidebar() {
  return (
    <div className="sticky top-0 lg:top-16 w-full border-b-2 lg:border-2 p-4 lg:rounded-lg bg-white lg:p-3 lg:w-fit h-fit">
      <form action={filterReviews} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="query" className="font-bold tracking-tight">
            Search
          </label>
          <input
            id="query"
            name="query"
            className="border-2 rounded-lg p-1"
            placeholder="Title, category, etc..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="font-bold tracking-tight">
            Location
          </label>
          <select
            id="location"
            name="location"
            className="border-2 rounded-lg p-1 bg-white"
            defaultValue={"All locations"}
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
            defaultValue={"All categories"}
          >
            {categoryFilterOptions.map((category) => (
              <option
                key={category}
                value={category.includes("All categories") ? "" : category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input id="verified" name="verified" type="checkbox"></input>
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
