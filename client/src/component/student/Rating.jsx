import React from "react";

const Rating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1">
      {/* Rating Number */}
      <span className="text-slate-600 font-medium mr-2">
        {rating}
      </span>

      {/* Stars */}
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`text-lg ${
            index < Math.floor(rating)
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;