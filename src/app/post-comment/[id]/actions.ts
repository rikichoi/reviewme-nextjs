"use server"
import prisma from "@/lib/db";
import { createCommentSchema } from "@/lib/validation";
import { redirect } from "next/navigation";



export async function createCommentForPost(formData: FormData, id: string) {
    const values = Object.fromEntries(formData.entries());

    const { title, comment, commentRating, experienceDate } = createCommentSchema.parse(values);


    await prisma.comments.create({
        data: {
            title,
            comment,
            commentRating,
            experienceDate: experienceDate || null,
            reviewId: parseInt(id),
        }
    })

    redirect(`/reviews/${id}`)
}