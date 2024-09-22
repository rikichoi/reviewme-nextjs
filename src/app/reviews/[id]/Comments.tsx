import React from "react";
import placeholderIcon from "@/assets/user-icon-placeholder.png";
import Image from "next/image";
import Link from "next/link";

export default function Comments() {
  return (
    // TODO: Implement Comments from backend - map it here
    <div className="border bg-white rounded-lg p-6 flex gap-5 items-center">
      <Image
        alt="User Icon"
        src={placeholderIcon}
        className="h-12 w-12 rounded-full bg-slate-200 p-2"
        width={300}
        height={300}
      />
      <Link href="/" className="text-blue-700 hover:underline">
        User
      </Link>
    </div>
  );
}
