import { Prisma } from "@prisma/client";

export type ReviewWithUser = Prisma.reviewsGetPayload<{ include: { User: true } }>;

export type CommentCount = {
    star5Percentage: number;
    star4Percentage: number;
    star3Percentage: number;
    star2Percentage: number;
    star1Percentage: number;
};