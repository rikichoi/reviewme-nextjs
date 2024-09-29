import { Prisma } from "@prisma/client";

export type ReviewWithUser = Prisma.reviewsGetPayload<{ include: { User: true } }>;