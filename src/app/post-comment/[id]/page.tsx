import React from "react";

type PostCommentPageProps = {
  params: {
    id: string;
  };
};

export default function PostCommentPage({
  params: { id },
}: PostCommentPageProps) {
  return (
    // TODO: Implement functionality to post a comment about the review using React Hook Form and Zod validation!
    <div className="max-w-3xl bg-white mx-auto my-10 p-8 shadow border">
      <h1 className="text-lg font-semibold tracking-tighter">
        Post a comment about the review!
      </h1>
      Review ID: {id}
    </div>
  );
}
