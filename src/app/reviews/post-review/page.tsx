import { Metadata } from "next";
import React from "react";
import PostReviewForm from "./PostReviewForm";

export const metadata: Metadata = {
  title: "Create a Review - ReviewMe",
  description: "Create a review for a product or service.",
};

export default function PostReviewPage() {
  return (
    <main className="flex flex-col items-center justify-items-center ">
      <div className="flex flex-col max-w-2xl w-full items-center gap-3 mt-5 border-2 rounded-lg drop-shadow-2xl justify-center p-12 bg-white">
        <h1 className="text-3xl lg:text-5xl tracking-tight font-bold pb-5">
          Create a review
        </h1>
        <PostReviewForm />
      </div>
    </main>
  );
}
