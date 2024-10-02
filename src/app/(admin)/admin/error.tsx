"use client"; // Error boundaries must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();

  return (
    <div className="justify-center text-center items-center flex flex-col py-5 gap-12">
      <h2 className="text-lg md:text-4xl ">{error.message}</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  );
}
