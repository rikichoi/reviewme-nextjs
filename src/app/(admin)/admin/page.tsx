import prisma from "@/lib/db";
import Image from "next/image";
import React from "react";
import StarRating from "@/components/StarRating";
import ReviewDescriptionDropdown from "@/components/ReviewDescriptionDropdown";
import ChangeStatusButton from "./ChangeStatusButton";
import { redirect } from "next/navigation";
import { getUser } from "@/auth";
import { logout } from "@/app/(auth)/actions";

export default async function AdminPage() {
  // const formattedCreatedAt = createdAtd;
  // TODO: ADD account admin status verification else redirect to login
  const admin = await getUser();
  if (!admin) {
    redirect("/login?redirectUrl=admin");
  }

  if (admin.role != "admin") {
    throw Error("Only admins can access this page.");
  }

  const reviewsTotalCount = await prisma.reviews.count({
    where: {
      verified: false,
    },
    orderBy: { createdAt: "desc" },
  });
  const reviews = await prisma.reviews.findMany({
    where: {
      verified: false,
    },
    orderBy: { createdAt: "desc" },
  });
  // TODO: ADD PAGINATION AND FILTER THROUGH BACKEND
  // TODO: ADD AN OPTIONAL URL FOR EMAIL, WEBSITE, SOCIAL MEDIA AND PHONE
  return (
    <div className="grow gap-3 lg:px-0 px-5 flex flex-col max-w-4xl mx-auto my-8">
      <div className="flex justify-between">
        <h2 className="font-semibold underline tracking-tight text-lg">
          Admin Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <h3>{admin.username}</h3>
          <form action={logout}>
            <button className="h-fit w-fit py-3 px-5 rounded-full text-sm  font-bold tracking-tighter bg-[#f86868] hover:bg-red-700 hover:text-white">
              Log Out
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-between">
        {/* TODO: append page number here */}
        {reviews.length > 0 && (
          <h1 className="text-sm tracking-tight">
            1 - {reviewsTotalCount} of {reviewsTotalCount} results
          </h1>
        )}
        {reviews.length === 0 && (
          <div className="text-center text-3xl py-5 font-semibold mx-auto">
            <p>No reviews pending approval</p>
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
      <div className="grid grid-cols-3 gap-5 p-5 border-b-2 max-h-32">
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
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
              <div className="flex space-x-2 justify-end">
                <ChangeStatusButton status={"decline"} id={id} />
                <ChangeStatusButton status={"approve"} id={id} />
              </div>
            </div>
            <div className="flex">
              <StarRating allowHover={false} value={ratingAvg} />
              <p className="ms-1 text-sm px-2 font-medium text-gray-500 ">|</p>
              <p className="ms-1 text-sm font-medium text-gray-500 ">
                {ratingAvg}
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 ">out of</p>
              <p className="ms-1 text-sm font-medium text-gray-500 ">5</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 ">{location}</p>
          </div>
        </div>
      </div>
      <ReviewDescriptionDropdown
        category={category}
        description={description}
      />
    </div>
  );
}
