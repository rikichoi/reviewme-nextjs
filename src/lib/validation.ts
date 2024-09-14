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


const reviewImageUrlSchema = z
    .custom<File | undefined>()
    .refine(
        (file) => !file || (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file",
    )
    .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
    }, "File must be less than 2MB");

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const someSchema = z.object({
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
  })

export const createReviewSchema = z.object({
    reviewImageUrl: someSchema,
    title: requiredString,
    description: requiredString,
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
        .refine((value) => value === false, "You cannot verify your own review"),
});

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;