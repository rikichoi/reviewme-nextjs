import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import Image from "next/image";
import prisma from "@/lib/db";
import StarRating from "@/components/StarRating";
import { formatDate } from "@/lib/utils";

type CommentsProps = {
  id: string;
};

export default async function Comments({ id }: CommentsProps) {
  const comments = await prisma.comments.findMany({
    where: {
      reviewId: parseInt(id),
    },
  });
  return (
    <div className="space-y-3">
      {comments ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="border bg-white rounded-lg p-6 flex flex-col"
          >
            <div className="flex gap-4">
              <div>
                <Image
                  alt="User Icon"
                  src={placeholderIcon}
                  className="h-12 w-12 rounded-full bg-slate-200 p-2"
                  width={300}
                  height={300}
                />
              </div>
              <div>
                <p>*username*</p>
                <p>*additional info - location, premium account, etc...*</p>
              </div>
            </div>
            <hr className="my-4"></hr>
            <div className="flex gap-3 items-center mb-3">
              <StarRating allowHover={false} value={comment.commentRating} />
              {/* TODO: Add verified badge here. Also make it so that admin has to verify the post for it to be shown. */}
              <p className="tracking-tight font-medium text-gray-600">
                *verified status*
              </p>
              <p className="flex flex-1 justify-end font-medium tracking-tight text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            <h2 className="font-bold text-lg mb-1">{comment.title}</h2>
            <p className="mb-4">{comment.comment}</p>
            {comment.experienceDate && (
              <h3 className="font-semibold text-sm tracking-tight">
                Date of experience:
                <span className="font-medium ">
                  {" "}
                  {formatDate(comment.experienceDate)}
                </span>
              </h3>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}
