import { z } from "zod";
import { categoryFilterOptions, locationFilterOptions } from "./filter-types";

const optionalString = z.string().trim().optional();
// const requiredString = z.string().min(1);

export const filterReviewsSchema = z.object({
    query: optionalString,
    location: optionalString.refine(value => locationFilterOptions.includes(value ? value : "All locations"), 'Invalid location'),
    category: optionalString.refine(value => categoryFilterOptions.includes(value ? value : "All categories"), 'Invalid category'),
    verified: z.coerce.boolean().optional(),
})