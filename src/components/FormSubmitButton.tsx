"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  isLoading?: boolean
) {
  const { pending } = useFormStatus();
  const loading = isLoading === true;

  return (
    <button
      {...props}
      className={`${(pending || loading) && " bg-slate-500 "} ${
        props.className
      }`}
      disabled={pending || loading}
      type="submit"
    >
      <span className="flex items-center justify-center gap-1">
        {props.children}
        {(pending || loading) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader-circle animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
      </span>
    </button>
  );
}
