"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function declineReview(id: number) {
    if (!id) {
        throw new Error("Review does not exist. Invalid id");
    }

    await prisma.reviews.delete({
        where: {
            id
        }
    })
    revalidatePath("/admin");
}

export async function approveReview(id: number) {
    if (!id) {
        throw new Error("Review does not exist. Invalid id");
    }

    await prisma.reviews.update({
        data: { verified: true },
        where: {
            id
        }
    })
    revalidatePath("/admin");
}