import { Prisma } from "@prisma/client";

export type ReviewWithUser = Prisma.reviewsGetPayload<{ include: { User: true } }>;

export type CommentCount = {
    star5Count: number;
    star4Count: number;
    star3Count: number;
    star2Count: number;
    star1Count: number;
};