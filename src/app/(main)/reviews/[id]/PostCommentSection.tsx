import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";

type PostCommentProps = {
  id: string;
};

export default function PostCommentSection({ id }: PostCommentProps) {
  return (
    <div className="border bg-white rounded-lg p-6 flex items-center mb-2">
      <Link
        href={`/post-comment/${id}`}
        className="flex sm:hidden h-fit w-full text-sm sm:text-lg py-3 justify-center rounded-full font-bold tracking-tighter bg-[#a6c0f0] hover:bg-blue-700 hover:text-white"
      >
        Write a comment
      </Link>
      <div className="items-center gap-5 flex-1 hidden sm:flex">
        <Image
          alt="User Icon"
          src={placeholderIcon}
          className="h-12 w-12 rounded-full bg-slate-200 p-2"
          width={300}
          height={300}
        />
        <Link
          href={`/post-comment/${id}`}
          className="text-blue-700 hover:underline sm:text-sm"
        >
          Write a comment
        </Link>
      </div>
      <Link
        href={`/post-comment/${id}`}
        className="text-blue-700 hover:underline hidden sm:flex"
      >
        <StarRating allowHover={true} value={0} />
      </Link>
    </div>
  );
}
