import prisma from "@/lib/db";
import { error } from "console";
import React from "react";

type ReviewPageProps = {
  params: {
    id: string;
  };
};

export default async function ReviewPage({ params: { id } }: ReviewPageProps) {
  const review = await prisma.reviews.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (!review) {
    throw error;
  }
  return (
    <div>
      <h1>{review.title}</h1>
      <p>{review.description}</p>
    </div>
  );
}
