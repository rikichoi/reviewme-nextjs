"use client";
import React from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema, CreateCommentSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { createCommentForPost } from "./actions";

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
    control,
    watch,
    formState: { errors },
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { commentRating: "2.5" },
  });

  const { field } = useController<CreateCommentSchema>({
    name: "experienceDate",
    control: control,
  });

  async function onSubmit(data: CreateCommentSchema, id: string) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data) {
        if (key === "experienceDate") {
          if (value) formData.append(key, value.toString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    try {
      await createCommentForPost(formData, id);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, id))}
      className="max-w-2xl bg-white mx-auto my-10 p-8 shadow border space-y-3"
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
          className={`${
            errors.title?.message && "border-red-500 "
          } border p-2 rounded-lg`}
        ></input>
        <p className="text-red-500">{errors.title?.message}</p>
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
          type="range"
          aria-invalid={errors.commentRating ? "true" : "false"}
          id="commentRating"
          name="commentRating"
          min="0"
          max="5"
          step="0.5"
          className="bg-blue-200 w-full h-4 cursor-pointer "
        />
        <p className="font-semibold text-green-500 text-lg text-center">
          {watch("commentRating")}
        </p>
        <div className="flex justify-between mt-2 mr-0.5">
          <span className="text-sm text-gray-500">0</span>
          <span className="text-sm text-gray-500">1</span>
          <span className="text-sm text-gray-500">2</span>
          <span className="text-sm text-gray-500">3</span>
          <span className="text-sm text-gray-500">4</span>
          <span className="text-sm text-gray-500">5</span>
        </div>
        <p className="text-red-500">{errors.commentRating?.message}</p>
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
          className={`${
            errors.comment?.message && "border-red-500 "
          } border p-2 rounded-lg min-h-32`}
        ></textarea>
        <p className="text-red-500">{errors.comment?.message}</p>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="experienceDate"
          className="text-lg font-semibold tracking-tighter"
        >
          Date of experience
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent {...field} className="w-auto p-0" align="start">
            <Calendar
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={field.onChange}
              mode="single"
            />
          </PopoverContent>
        </Popover>
        <p className="text-red-500">{errors.experienceDate?.message}</p>
      </div>
      <button
        type="submit"
        className="border rounded-lg p-2 text-white bg-[#1c1c1c] w-full"
      >
        Submit
      </button>
    </form>
  );
}
