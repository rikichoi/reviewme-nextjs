"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      className={`${pending && " bg-slate-500 "} ${props.className}`}
      disabled={pending}
      type="submit"
    >
      <span className="flex items-center justify-center gap-1">
        {props.children}
        {pending && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-circle animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
      </span>
    </button>
  );
}

// "use client";

// import { useFormStatus } from "react-dom";
// import LoadingButton from "./LoadingButton";

// export default function FormSubmitButton(
//   props: React.ButtonHTMLAttributes<HTMLButtonElement>,
// ) {
//   const { pending } = useFormStatus();

//   return <LoadingButton {...props} type="submit" loading={pending} />;
// }
