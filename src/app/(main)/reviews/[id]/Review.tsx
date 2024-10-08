import Image from "next/image";
import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import { Badge } from "@/components/ui/badge";
import { formatConciseDate } from "@/lib/utils";
import { ReviewWithUser } from "@/lib/types";

type ReviewProps = {
  reviewDetails: ReviewWithUser;
};

export default function Review({ reviewDetails }: ReviewProps) {
  return (
    <div className="border bg-white rounded-lg p-6 flex items-center mb-2">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-3">
          <Image
            alt="User Icon"
            src={placeholderIcon}
            className="h-12 w-12 rounded-full bg-slate-200 p-2"
            width={300}
            height={300}
          />
          <div className="space-y-1">
            <p className="text-xs md:text-base">{reviewDetails.User?.displayName || "Anonymous User"}</p>
            <p className="text-xs md:text-base">
              {formatConciseDate(reviewDetails.createdAt)}
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            {/* TODO: explore other options to prevent badge/child div from growing in a flex container */}
            <Badge className="bg-[#3db578] hidden sm:flex text-xs text-center text-black font-bold tracking-wide h-fit hover:bg-[#3db578] hover:cursor-default">
              MAIN REVIEW
            </Badge>
          </div>
        </div>
        <div className="text-xs md:text-base"
          dangerouslySetInnerHTML={{ __html: reviewDetails.description }}
        ></div>
      </div>
    </div>
  );
}
