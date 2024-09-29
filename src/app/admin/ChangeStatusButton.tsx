"use client";
import { CheckIcon, XIcon } from "lucide-react";
import React from "react";
import { approveReview, declineReview } from "./actions";

type ChangeStatusButtonProps = {
  status: "approve" | "decline";
  id: number;
};

export default function ChangeStatusButton({
  status,
  id,
}: ChangeStatusButtonProps) {
  return status === "approve" ? (
    <button
      onClick={() => approveReview(id)}
      className="text-white hover:bg-green-700 bg-green-500 flex items-center border rounded-lg p-2"
    >
      <CheckIcon className="w-4 h-4 mr-2" />
      Approve
    </button>
  ) : (
    <button
      onClick={() => declineReview(id)}
      className="text-white hover:bg-red-700 bg-red-500 border flex items-center rounded-lg p-2"
    >
      <XIcon className="w-4 h-4 mr-2" />
      Decline
    </button>
  );
}
