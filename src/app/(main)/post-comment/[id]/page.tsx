import React from "react";
import { getUser } from "@/auth";
import { redirect } from "next/navigation";
import PostCommentForm from "./PostCommentForm";

type PostCommentPageProps = {
  params: {
    id: string;
  };
};

export default async function PostCommentPage({
  params: { id },
}: PostCommentPageProps) {
  const session = await getUser();

  if (!session) {
    redirect(`/login?redirectUrl=post-comment/${id}`);
  }

  return <PostCommentForm id={id} />;
}
