import Link from "next/link";
import React from "react";

export default function PostConfirmationPage() {
  return (
    <main className="flex flex-col items-center justify-items-center py-5">
      <div className="flex flex-col max-w-2xl w-full items-center gap-3 border-2 rounded-lg drop-shadow-2xl justify-center p-12 bg-white">
        <h1 className="text-3xl lg:text-5xl tracking-tight font-bold pb-5">
          Review submitted!
        </h1>
        <p className="text-lg text-center">
          Your review has been submitted and is now pending approval.
        </p>
        <Link
          href={"/"}
          className="h-fit w-fit py-3 px-5 rounded-full text-sm font-bold tracking-tighter bg-[#a6c0f0] hover:bg-blue-700 hover:text-white"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
