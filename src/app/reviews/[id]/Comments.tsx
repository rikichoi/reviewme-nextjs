import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";

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
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border bg-white rounded-lg p-6 flex gap-5 items-center"
        >
          <Image
            alt="User Icon"
            src={placeholderIcon}
            className="h-12 w-12 rounded-full bg-slate-200 p-2"
            width={300}
            height={300}
          />
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
