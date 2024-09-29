"use server";
import { getUser } from "@/auth";
import prisma from "@/lib/db";
import { createReviewSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import path from "path";

export async function postReview(formData: FormData) {
    const user = await getUser();
    let userId = null;
    if (user) {
        userId = user.id;
    }
  
    const reviewValues = Object.fromEntries(formData.entries());
    const { category, description, location, ratingAvg, title, reviewImageUrl } = createReviewSchema.parse(reviewValues)

    let uploadedReviewImageUrl: string = "";

    if (reviewImageUrl) {
        const blob = await put(`review_images/${title}${path.extname(reviewImageUrl.name)}`,
            reviewImageUrl, { access: 'public', addRandomSuffix: false }
        )
        uploadedReviewImageUrl = blob.url;
    }

    await prisma.reviews.create({
        data: {
            userId,
            category,
            description: description.trim(),
            location,
            ratingAvg: parseFloat(ratingAvg),
            title: title.trim(),
            verified: false,
            reviewImageUrl: uploadedReviewImageUrl,
            updatedAt: new Date().toISOString(),
        }
    })
    redirect("/reviews/post-confirmation")
}