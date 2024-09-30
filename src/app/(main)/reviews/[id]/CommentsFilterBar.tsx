import React from "react";
import { CommentRatingProgress } from "./CommentRatingProgress";

export default function CommentsFilterBar() {
  return (
    <form className="border bg-white rounded-lg p-6 flex flex-col gap-1 tabular-nums">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input type="checkbox" name="ratingAvg" id="ratingAvg" />
          <label htmlFor="ratingAvg">5-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input type="checkbox" name="ratingAvg" id="ratingAvg" />
          <label htmlFor="ratingAvg">4-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input type="checkbox" name="ratingAvg" id="ratingAvg" />
          <label htmlFor="ratingAvg">3-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input type="checkbox" name="ratingAvg" id="ratingAvg" />
          <label htmlFor="ratingAvg">2-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input type="checkbox" name="ratingAvg" id="ratingAvg" />
          <label htmlFor="ratingAvg">1-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
    </form>
  );
}
