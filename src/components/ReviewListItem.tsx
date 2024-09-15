import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";

export default async function ReviewListItem() {
  const reviews = await prisma.reviews.findMany();
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          description={review.description}
          ratingAvg={review.ratingAvg}
          reviewImageUrl={review.reviewImageUrl}
          title={review.title}
        />
      ))}
    </div>
  );
}

type ReviewItemProps = {
  title: string;
  description: string;
  ratingAvg: number;
  reviewImageUrl: string;
};

function ReviewItem({
  description,
  ratingAvg,
  reviewImageUrl,
  title,
}: ReviewItemProps) {
  return (
    <div className="flex flex-col gap-5">
      <Image height={40} width={40} src={reviewImageUrl} alt="Review Image" />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{ratingAvg}</p>
    </div>
  );
}
