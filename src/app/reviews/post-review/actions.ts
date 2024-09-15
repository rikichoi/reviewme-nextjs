"use server";
import prisma from "@/lib/db";
import { createReviewSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import path from "path";

export async function postReview(formData: FormData) {
    const reviewValues = Object.fromEntries(formData.entries());
    const { category, description, location, ratingAvg, title, verified, reviewImageUrl } = createReviewSchema.parse(reviewValues)

    let uploadedReviewImageUrl: string = "";

    if (reviewImageUrl) {
        const blob = await put(`review_images/${title}${path.extname(reviewImageUrl.name)}`,
            reviewImageUrl, { access: 'public', addRandomSuffix: false }
        )
        uploadedReviewImageUrl = blob.url;
    }

    await prisma.reviews.create({
        data: {
            category,
            description: description.trim(),
            location,
            ratingAvg: parseFloat(ratingAvg),
            title: title.trim(),
            verified: Boolean(verified),
            reviewImageUrl: uploadedReviewImageUrl,
            updatedAt: new Date().toISOString(),
        }
    })

}