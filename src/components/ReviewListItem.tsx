import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ReviewListItemProps = {
  query?: string;
  location?: string;
  category?: string;
  verified?: boolean;
};

export default async function ReviewListItem({
  category,
  location,
  query,
}: ReviewListItemProps) {
  const reviews = await prisma.reviews.findMany({
    where: {
      verified: true,
      AND: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
          category: {
            contains: category,
            mode: "insensitive",
          },
          location: {
            contains: location,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return (
    <div className="grow px-5 gap-5 flex flex-col">
      {reviews.length === 0 && (
        <div className="text-center text-lg font-semibold">
          No reviews found
        </div>
      )}
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
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
  id: number;
  title: string;
  description: string;
  ratingAvg: number;
  reviewImageUrl: string;
};

function ReviewItem({
  id,
  description,
  ratingAvg,
  reviewImageUrl,
  title,
}: ReviewItemProps) {
  return (
    <Link
      href={`/reviews/${id}`}
      className="grid grid-cols-3 rounded-lg gap-5 p-5 bg-white border-2 hover:drop-shadow-xl"
    >
      <div>
        <Image
          className="object-cover border-2 rounded"
          height={500}
          width={500}
          src={reviewImageUrl}
          alt="Review Image"
        />
      </div>
      <div className="col-span-2">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center">
          {[...Array(Math.ceil(ratingAvg))].map((rating, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {[...Array(Math.ceil(5 - ratingAvg))].map((rating, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}

          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {ratingAvg}
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        {/* this is a temporary solution to render html content. TODO: find a better, more safer way to render this information */}
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </Link>
  );
}
