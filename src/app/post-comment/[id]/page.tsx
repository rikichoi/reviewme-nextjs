"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema, CreateCommentSchema } from "@/lib/validation";

type PostCommentPageProps = {
  params: {
    id: string;
  };
};

export default function PostCommentPage({
  params: { id },
}: PostCommentPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
  });

  const onSubmit: SubmitHandler<CreateCommentSchema> = (data) =>
    console.log(data);

  return (
    // TODO: Implement functionality to post a comment about the review using React Hook Form and Zod validation!
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl bg-white mx-auto my-10 p-8 shadow border space-y-3"
    >
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="text-lg font-semibold tracking-tighter"
        >
          Give your comment/experience a title
        </label>
        <input
          {...register("title")}
          id="title"
          name="title"
          className="border p-2 rounded-lg"
        ></input>
        <p>{errors.title?.message}</p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="commentRating"
          className="text-lg font-semibold tracking-tighter"
        >
          Rate this comment or your recent experience
        </label>
        <input
          {...register("commentRating")}
          id="commentRating"
          name="commentRating"
          className="border p-2 rounded-lg"
        ></input>
        <p>{errors.commentRating?.message}</p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="comment"
          className="text-lg font-semibold tracking-tighter"
        >
          Tell us more about your experience
        </label>
        <textarea
          {...register("comment")}
          id="comment"
          name="comment"
          placeholder="What made your experience great? Perhaps provide an anecdote! Remember to be honest, helpful, and constructive!"
          className="border p-2 rounded-lg min-h-32"
        ></textarea>
        <p>{errors.comment?.message}</p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="experienceDate"
          className="text-lg font-semibold tracking-tighter"
        >
          Date of experience
        </label>
        <input
          {...register("experienceDate")}
          id="experienceDate"
          name="experienceDate"
          className="border p-2 rounded-lg"
        ></input>
      </div>
      <button
        type="submit"
        className="border rounded-lg p-2 text-white bg-[#1c1c1c]"
      >
        Submit
      </button>
    </form>
  );
}
