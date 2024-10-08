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
    page: z.string().regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number").optional(),
})

// const MAX_FILE_SIZE = (1024 * 1024 * 2);
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const reviewImageUrlSchema = z.custom<File | undefined>()
    .refine(file => file !== undefined, "Image is required")
    .refine(
        (file) => (file instanceof File && file.type.startsWith("image/")),
        "Must be an image file",
    )
    .refine((file) => {
        return file && file.size < 1024 * 1024 * 2;
    }, "File must be less than 2MB");

export const createReviewSchema = z.object({
    reviewImageUrl: reviewImageUrlSchema,
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
    verified: requiredString
        .refine((value) => value === "false", "You cannot modify this value. You cannot verify your own review."),
})

export type CreateReviewSchema = z.infer<typeof createReviewSchema>;

export const createCommentSchema = z.object({
    title: requiredString,
    comment: requiredString,
    commentRating: numericRequiredString,
    experienceDate: z.coerce.date().optional(),
})

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;

export const signUpSchema = z.object({
    email: z.string().trim().min(1, "Required").email("Invalid email"),
    username: requiredString.regex(/^[a-zA-Z0-9_-]*$/, "Only letters, numbers, - and _ allowed"),
    password: requiredString.min(8, "Password must be at least 8 characters long"),
})

export type SignUpValues = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
    username: requiredString,
    password: requiredString,
})

export type LogInValues = z.infer<typeof logInSchema>;