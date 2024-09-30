import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRating from "./StarRating";
import ReviewDescriptionDropdown from "./ReviewDescriptionDropdown";

type ReviewListItemProps = {
  query?: string;
  location?: string;
  category?: string;
  verified?: boolean;
  sort?: string;
  order?: string;
  page: string;
};

export default async function ReviewListItem({
  category,
  location,
  query,
  sort = "createdAt",
  order = "desc",
  page = "1",
}: ReviewListItemProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;

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
    orderBy: {
      [sort]: order,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const reviewsTotalCount = await prisma.reviews.count({
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

  // TODO: ADD AN OPTIONAL URL FOR EMAIL, WEBSITE, SOCIAL MEDIA AND PHONE
  return (
    <div className="grow gap-3 lg:px-0 px-5 flex flex-col">
      <div className="flex justify-between">
        {/* TODO: append page number here */}
        {reviews.length > 0 && (
          <h1 className="text-sm tracking-tight">
           {(reviews.length < 6 ) ? reviewsTotalCount - reviews.length : reviews.length * (currentPage - 1)} - {(reviews.length < 6 ) ? reviewsTotalCount : reviews.length * currentPage}{" "}
            of {reviewsTotalCount} results
          </h1>
        )}
        {reviews.length === 0 && (
          <div className="m-auto text-center text-lg font-semibold">
            No reviews found...
          </div>
        )}
      </div>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          description={review.description}
          ratingAvg={review.ratingAvg}
          reviewImageUrl={review.reviewImageUrl}
          title={review.title}
          location={review.location}
          category={review.category}
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
  location: string;
  category: string;
};

function ReviewItem({
  id,
  ratingAvg,
  reviewImageUrl,
  title,
  location,
  description,
  category,
}: ReviewItemProps) {
  return (
    <div className="bg-white border-2 min-h-40 rounded-lg hover:drop-shadow-lg">
      <Link
        href={`/reviews/${id}`}
        className="grid grid-cols-3 gap-5 p-5 border-b-2 max-h-32"
      >
        <div className="items-center flex">
          <Image
            className="object-cover rounded max-h-24"
            height={500}
            width={500}
            src={reviewImageUrl}
            alt="Review Image"
          />
        </div>
        <div className="col-span-2 space-y-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            <div className="flex items-center gap-2">
              <StarRating allowHover={false} value={ratingAvg} />
              <p className="text-sm font-medium text-gray-500 truncate">{ratingAvg} | out of 5</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 ">{location}</p>
          </div>
        </div>
      </Link>
      <ReviewDescriptionDropdown
        category={category}
        description={description}
      />
    </div>
  );
}
