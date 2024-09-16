"use client";
import {
  categoryFilterOptions,
  locationFilterOptions,
} from "@/lib/filter-types";
import React from "react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewSchema, CreateReviewSchema } from "@/lib/validation";
import { postReview } from "./actions";
import Tiptap from "@/components/Editor/Tiptap";
import FormSubmitButton from "@/components/FormSubmitButton";

export default function PostReviewForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewSchema>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      verified: "false",
      ratingAvg: "2.5",
    },
  });

  const { field } = useController({
    name: "reviewImageUrl",
    control: control,
  });

  async function onSubmit(data: CreateReviewSchema) {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (data) {
        formData.append(key, value);
      }
    });

    try {
      await postReview(formData);
    } catch (e) {
      alert(e);
    }
  }

  const descriptionVal = getValues("description");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      <div className="flex flex-col">
        <label htmlFor="reviewImageUrl" className="font-bold tracking-tight">
          Image
        </label>
        <input
          {...field}
          value={undefined} // Remove the value property
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log(file);
            field.onChange(file);
          }}
          type="file"
          accept="image/*"
          aria-invalid={errors.reviewImageUrl ? "true" : "false"}
          id={field.name}
          name={field.name}
          className={`${
            errors.reviewImageUrl && "  border-red-500 "
          } border-2 focus:border-zinc-950 outline-none rounded-lg p-1`}
          placeholder="reviewImageUrl of your review"
        />
        {errors.reviewImageUrl && (
          <p role="alert" className="text-red-500">
            {errors.reviewImageUrl.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="title" className="font-bold tracking-tight">
          Title
        </label>
        <input
          {...register("title")}
          aria-invalid={errors.title ? "true" : "false"}
          id="title"
          name="title"
          className={`${
            errors.title && "  border-red-500 "
          } border-2 focus:border-zinc-950 outline-none rounded-lg p-1`}
          placeholder="Title of your review"
        />
        {errors.title && (
          <p role="alert" className="text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="font-bold tracking-tight">
          Category
        </label>
        <select
          {...register("category")}
          aria-invalid={errors.category ? "true" : "false"}
          id="category"
          name="category"
          defaultValue={""}
          className={`${
            errors.category && "  border-red-500 "
          } border-2 focus:border-zinc-950 outline-none rounded-lg p-1 bg-white`}
        >
          <option value="" hidden>
            Select a category
          </option>
          {categoryFilterOptions.slice(1).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p role="alert" className="text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="location" className="font-bold tracking-tight">
          Location
        </label>
        <select
          {...register("location")}
          aria-invalid={errors.location ? "true" : "false"}
          id="location"
          name="location"
          defaultValue={""}
          className={`${
            errors.location && "  border-red-500 "
          } border-2 focus:border-zinc-950 outline-none rounded-lg p-1 bg-white`}
        >
          <option value="" hidden>
            Select a location
          </option>
          {locationFilterOptions.slice(1).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        {errors.location && (
          <p role="alert" className="text-red-500">
            {errors.location.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ratingAvg" className="font-bold tracking-tight">
          Rating
        </label>
        <span className="font-semibold text-green-500 text-lg text-center">
          {watch("ratingAvg")}
        </span>
        <input
          {...register("ratingAvg")}
          type="range"
          aria-invalid={errors.ratingAvg ? "true" : "false"}
          id="ratingAvg"
          name="ratingAvg"
          min="0"
          max="5"
          step="0.5"
          className="bg-blue-200 w-full h-4 cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between mt-2 mr-0.5">
          <span className="text-sm text-gray-500">0</span>
          <span className="text-sm text-gray-500">1</span>
          <span className="text-sm text-gray-500">2</span>
          <span className="text-sm text-gray-500">3</span>
          <span className="text-sm text-gray-500">4</span>
          <span className="text-sm text-gray-500">5</span>
        </div>
        {errors.ratingAvg && (
          <p role="alert" className="text-red-500">
            {errors.ratingAvg.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="font-bold tracking-tight">
          Description
        </label>
        <Tiptap
          description={descriptionVal}
          setValue={setValue}
          errors={errors.description?.message}
          register={register}
        />
        {errors.description && (
          <p role="alert" className="text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>
      <FormSubmitButton
        loading={isSubmitting}
        className="rounded-lg bg-zinc-950 text-white p-2 font-bold tracking-tight"
      >
        Post review
      </FormSubmitButton>
    </form>
  );
}
