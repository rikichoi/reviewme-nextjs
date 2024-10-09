"use client";
import React, { useCallback } from "react";
import { CommentRatingProgress } from "./CommentRatingProgress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CommentCount } from "@/lib/types";

type CommentsFilterBarProps = {
  star5?: boolean;
  star4?: boolean;
  star3?: boolean;
  star2?: boolean;
  star1?: boolean;
  commentCount: CommentCount
};

export default function CommentsFilterBar({
  star1,
  star2,
  star3,
  star4,
  star5,
  commentCount
}: CommentsFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (isChecked: boolean, name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (isChecked) {
        params.set(name, value);
        return params.toString();
      } else {
        params.delete(name);
        return params.toString();
      }
    },
    [searchParams]
  );

  function applyFilter(isChecked: boolean, name: string, value: boolean) {
    if (isChecked) {
      router.push(
        `${pathname}?${createQueryString(isChecked, name, value.toString())}`
      );
    } else {
      router.push(`${pathname}?${createQueryString(isChecked, name, "")}`);
    }
  }

  return (
    // TODO: Implement filter functioanlity
    // add all the comments up and divide by amount

    <form className="border bg-white rounded-lg p-6 flex flex-col gap-1 tabular-nums">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input
            onChange={(e) =>
              applyFilter(e.target.checked, e.target.name, e.target.checked)
            }
            type="checkbox"
            name="star5"
            id="5"
            defaultChecked={star5}
          />
          <label htmlFor="5">5-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input
            onChange={(e) =>
              applyFilter(e.target.checked, e.target.name, e.target.checked)
            }
            type="checkbox"
            name="star4"
            id="4"
            defaultChecked={star4}
          />
          <label htmlFor="4">4-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input
            onChange={(e) =>
              applyFilter(e.target.checked, e.target.name, e.target.checked)
            }
            type="checkbox"
            name="star3"
            id="3"
            defaultChecked={star3}
          />
          <label htmlFor="3">3-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input
            onChange={(e) =>
              applyFilter(e.target.checked, e.target.name, e.target.checked)
            }
            type="checkbox"
            name="star2"
            id="2"
            defaultChecked={star2}
          />
          <label htmlFor="2">2-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 text-sm max-w-16 w-full">
          <input
            onChange={(e) =>
              applyFilter(e.target.checked, e.target.name, e.target.checked)
            }
            type="checkbox"
            name="star1"
            id="1"
            defaultChecked={star1}
          />
          <label htmlFor="1">1-star</label>
        </div>
        <CommentRatingProgress />
        <p className="max-w-12 w-full text-end">33%</p>
      </div>
    </form>
  );
}
