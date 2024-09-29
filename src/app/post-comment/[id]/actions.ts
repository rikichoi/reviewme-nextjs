"use server"
import { getUser } from "@/auth";
import prisma from "@/lib/db";
import { createCommentSchema } from "@/lib/validation";
import { redirect } from "next/navigation";



export async function createCommentForPost(formData: FormData, id: string) {
    const user = await getUser();
    if (!user) {
        throw new Error("You must be logged in to post a comment")
    }
    const userId = user.id;

    const values = Object.fromEntries(formData.entries());

    const { title, comment, commentRating, experienceDate } = createCommentSchema.parse(values);


    await prisma.comments.create({
        data: {
            userId,
            title,
            comment,
            commentRating: parseFloat(commentRating),
            experienceDate: experienceDate || null,
            reviewId: parseInt(id),
        }
    })

    redirect(`/reviews/${id}`)
}