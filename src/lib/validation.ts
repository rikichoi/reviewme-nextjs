import { z } from "zod";
import { categoryFilterOptions, locationFilterOptions } from "./filter-types";

const optionalString = z.string().optional();
const requiredString = z.string().trim().min(1, "Required");
const numericRequiredString = requiredString.regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number");

export const filterReviewsSchema = z.object({
    query: optionalString,
    location: optionalString.refine(value => locationFilterOptions.includes(value ? value : "All locations"), 'Invalid location'),
    category: optionalString.refine(value => categoryFilterOptions.includes(value ? value : "All categories"), 'Invalid category'),
    verified: z.coerce.boolean().optional(),
})

const MAX_FILE_SIZE = (1024 * 1024 * 2);
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const reviewImageUrlSchema = z.object({
    reviewImageUrl: z
        .any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Image is required. Max image size is 2MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})

export const createReviewSchema = z.object({
    title: requiredString,
    description: requiredString.refine(value => value !== "<p></p>", "Description is required"),
    ratingAvg: numericRequiredString.max(
        9,
        "Number can't be longer than 9 digits",
    ),
    location: requiredString.refine(
        (value) =>
            locationFilterOptions.includes(value ? value : "All locations"),
        "Invalid location"
    ),
    category: requiredString.refine(
        (value) =>
            categoryFilterOptions.includes(value ? value : "All categories"),
        "Invalid category"
    ),
    verified: z
        .boolean()
        .refine((value) => value === false, "You cannot modify this value. You cannot verify your own review."),
}).and(reviewImageUrlSchema)

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;