import React from "react";
import { getUser } from "@/auth";
import { redirect } from "next/navigation";
import PostCommentForm from "./PostCommentForm";

type PostCommentPageProps = {
  params: {
    id: string;
  };
};

export default function PostCommentPage({
  params: { id },
}: PostCommentPageProps) {
  const session = getUser();

  if (!session) {
    redirect("/login");
  }

  return <PostCommentForm id={id} />;
}
