"use client";
import { useState } from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  value: number;
  allowHover: boolean;
}

function StarIcon({
  filled,
  half,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  half: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <span
      className={`${filled ? "bg-[#00b67a] " : " bg-[#dcdce6] "} ${
        half &&
        " bg-[image:linear-gradient(to_right,#00b67a_0%,#00b67a_50%,#dcdce6_50%,#dcdce6_100%)] "
      } bg-[#00b67a] relative inline-block h:3 w:3 sm:w-7 sm:h-7 p-1 border border-[#028d5f]`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Star
        fill={filled ? "#fcac42" : "#ffffff"}
        className={`w-full h-full ${filled ? "text-yellow-400" : "text-white"}`}
      />
      {half && (
        <span className="absolute inset-0 overflow-hidden p-1">
          <StarHalf
            fill="#fcac42"
            color="#facc15"
            className="w-full h-full text-yellow-400"
          />
        </span>
      )}
    </span>
  );
}

export default function StarRating({ value, allowHover }: StarRatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(
    hoveredValue !== null ? hoveredValue : roundedValue
  );
  const hasHalfStar =
    (hoveredValue !== null ? hoveredValue : roundedValue) % 1 !== 0;

  return (
    <div
      className="flex items-center space-x-1"
      aria-label={`Rating: ${value} out of 5 stars`}
    >
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          filled={index < fullStars}
          half={hasHalfStar && index === fullStars}
          onMouseEnter={() => allowHover && setHoveredValue(index + 1)}
          onMouseLeave={() => allowHover && setHoveredValue(null)}
        />
      ))}
    </div>
  );
}
