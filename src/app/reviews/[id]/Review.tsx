import Image from "next/image";
import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import { Badge } from "@/components/ui/badge";

type ReviewProps = {
  description: string;
};

export default function Review({ description }: ReviewProps) {
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
          {/* TODO: Implement user and time from backend */}
          <p>*username*</p>
          <p>*time*</p>
          <div className="flex flex-1 justify-end">
            {/* TODO: explore other options to prevent badge/child div from growing in a flex container */}
            <Badge className="bg-slate-300 text-black font-bold tracking-wide h-fit hover:bg-slate-300">MAIN REVIEW</Badge>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  );
}
