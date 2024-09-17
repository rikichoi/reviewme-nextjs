import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  value: number;
}

function StarIcon({ filled, half }: { filled: boolean; half: boolean }) {
  return (
    <span className="relative inline-block w-5 h-5">
      <Star
        fill={filled ? "#facc15" : "none"}
        className={`w-full h-full ${
          filled ? "text-yellow-400" : "text-gray-300"
        }`}
      />
      {half && (
        <span className="absolute inset-0 overflow-hidden ">
          <StarHalf
            fill="#facc15"
            color="#facc15"
            className="w-full h-full text-yellow-400"
          />
        </span>
      )}
    </span>
  );
}

export default function StarRating({ value }: StarRatingProps = { value: 0 }) {
  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;

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
        />
      ))}
    </div>
  );
}
