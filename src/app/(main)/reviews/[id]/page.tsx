import StarRating from "@/components/StarRating";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import prisma from "@/lib/db";
import { calculateRatingString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";
import CommentsFilterBar from "./CommentsFilterBar";
import PostCommentSection from "./PostCommentSection";
import banner1 from "@/assets/banner1.jpeg";
import { Mail, MapPin, Phone } from "lucide-react";
import Review from "./Review";
import { Metadata } from "next";
import { CommentCount } from "@/lib/types";

type ReviewPageProps = {
  searchParams: {
    star5?: boolean;
    star4?: boolean;
    star3?: boolean;
    star2?: boolean;
    star1?: boolean;
  };
  params: {
    id: string;
  };
};

async function getReview(id: string) {
  const review = await prisma.reviews.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      User: true,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
}

async function getCommentRatingCount(id: string): Promise<CommentCount> {
  const commentCount = await prisma.comments.findMany({
    where: {
      reviewId: parseInt(id),
    },
  });
  return {
    star5Percentage: Math.round(
      (commentCount.reduce(
        (total, comment) => (comment.commentRating == 5 ? total + 1 : total),
        0
      ) /
        commentCount.length) *
        100
    ),
    star4Percentage: Math.round(
      (commentCount.reduce(
        (total, comment) => (comment.commentRating == 4 ? total + 1 : total),
        0
      ) /
        commentCount.length) *
        100
    ),
    star3Percentage: Math.round(
      (commentCount.reduce(
        (total, comment) => (comment.commentRating == 3 ? total + 1 : total),
        0
      ) /
        commentCount.length) *
        100
    ),
    star2Percentage: Math.round(
      (commentCount.reduce(
        (total, comment) => (comment.commentRating == 2 ? total + 1 : total),
        0
      ) /
        commentCount.length) *
        100
    ),
    star1Percentage: Math.round(
      (commentCount.reduce(
        (total, comment) => (comment.commentRating == 1 ? total + 1 : total),
        0
      ) /
        commentCount.length) *
        100
    ),
  };
}

export async function generateMetadata({
  params: { id },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(id);

  return {
    title: review.title + " | ReviewMe",
  };
}

export default async function ReviewPage({
  params: { id },
  searchParams: { star1, star2, star3, star4, star5 },
}: ReviewPageProps) {
  const review = await getReview(id);

  if (!review) {
    throw new Error("Review not found");
  }

  const commentCount = await getCommentRatingCount(id);

  return (
    <main className="flex flex-col items-center justify-items-center mb-10">
      <div className="bg-white z-50 border-b min-h-40 w-full p-2 sticky top-0 md:static">
        <div className="grid grid-cols-3 gap-5 p-5 max-w-5xl mx-auto">
          <div className="items-center w-fit flex">
            <Image
              className="object-contain rounded max-h-24"
              height={500}
              width={500}
              src={review.reviewImageUrl}
              alt="Review Image"
            />
          </div>
          <div className="col-span-2 space-y-3">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl tracking-tight font-bold">
                {review.title}
              </h1>
              <div className="flex items-center">
                <span className="pointer-events-none text-lg hidden md:flex tracking-tighter text-gray-500 items-center">
                  Rating score: {review.ratingAvg} out of 5 stars
                  <span className="text-3xl px-4">•</span>
                  {calculateRatingString(review.ratingAvg)}
                </span>
              </div>
              <div className="flex group relative w-fit pb-3">
                <div className="flex items-center">
                  <StarRating allowHover={false} value={review.ratingAvg} />
                  <p className="ms-1 px-2 text-gray-500 ">{review.ratingAvg}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 lucide lucide-info"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div className="hidden border-2 group-hover:flex flex-col grow bg-white p-4 min-w-96 absolute gap-3 rounded-lg drop-shadow-xl mt-8">
                  <p className="text-xs">
                    The ReviewScore isn’t just a simple average of all reviews.
                    It’s based on multiple factors like the age and number of
                    reviews.
                  </p>
                  <p className="text-xs">
                    Whether or not a business actively asks customers to write
                    reviews also impacts the ReviewScore.{" "}
                    <span className="text-[#215cd4] hover:cursor-pointer">
                      Read more.
                    </span>
                  </p>
                </div>
              </div>
              <VerifiedBadge />
            </div>
            {/* <div>
              <p className="font-medium text-sm text-gray-500 dark:text-gray-400">
                TODO: Add google maps api autocomplete address in the post a review form
                Located at: {review.location}
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse gap-5 md:max-w-5xl md:mx-auto md:flex-row grow px-3 sm:px-10 md:px-5 pt-0 md:pt-5">
        <div className="flex-1 flex flex-col gap-4">
          <Review reviewDetails={review} />
          <PostCommentSection id={id} />
          <CommentsFilterBar
            star5={star5}
            star4={star4}
            star3={star3}
            star2={star2}
            star1={star1}
            commentCount={commentCount}
          />
          <Comments
            id={id}
            star5={star5}
            star4={star4}
            star3={star3}
            star2={star2}
            star1={star1}
          />
        </div>
        <div>
          <div className="border bg-white rounded-t-none rounded-b-lg md:rounded-lg flex items-center mb-2">
            <div className="flex items-center flex-col gap-2 py-5 flex-1">
              <div className="px-5 sm:px-0 sm:max-w-64">
                <h2 className="text-sm font-semibold tracking-tight">
                  On a mission to become Australia’s flexiest bank
                </h2>
                <p className="text-xs font-semibold tracking-tight text-gray-400">
                  Information written by the company
                </p>
              </div>
              <div className="px-8 shrink flex">
                <Image
                  alt="User Icon"
                  src={banner1}
                  className="max-w-32 shrink flex sm:max-w-64 rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
              <hr className="border-slate-200 w-4/5 my-2" />
              <div className="px-5 sm:px-0 sm:max-w-64">
                <h2 className="text-sm font-semibold tracking-tight">
                  About ReviewMe
                </h2>
                <p className="text-xs font-semibold tracking-tight text-gray-400 mb-2">
                  Information written by the company
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-medium tracking-wide">
                    ReviewMe is a dynamic review posting platform where users
                    can share honest feedback on a wide range of products,
                    services, and experiences.
                  </p>
                  <p className="text-xs font-medium tracking-wide">
                    Whether you&apos;re reviewing a restaurant, a gadget, an
                    app, or a vacation destination, ReviewMe offers a
                    user-friendly interface that encourages thoughtful, detailed
                    reviews. With easy search functionality, users can quickly
                    find and compare feedback, helping them make informed
                    decisions before purchasing or experiencing something new.
                  </p>
                  <p className="text-xs font-medium tracking-wide">
                    ReviewMe fosters a community of reviewers, rewarding members
                    with points and badges for contributing helpful, authentic
                    reviews and making the platform an essential hub for
                    discovering real opinions.
                  </p>
                </div>
              </div>
              <hr className="border-slate-200 w-4/5 my-2" />
              <div className="px-5 sm:px-0 sm:max-w-64 space-y-3">
                <h2 className="text-sm font-semibold tracking-tight">
                  Contact
                </h2>
                {/* TODO: Add contact information */}
                <span className="flex items-center gap-3 text-sm">
                  <Phone size={16} /> 123 456 789
                </span>
                <span className="flex items-center gap-3 text-sm">
                  <MapPin size={16} /> John St, Hawthorn VIC 3122
                </span>
                <span className="flex items-center gap-3 text-sm">
                  <Mail size={16} /> reviewme@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
