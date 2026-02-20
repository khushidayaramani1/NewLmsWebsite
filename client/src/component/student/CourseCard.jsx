import React from "react";
import Rating from "./Rating";

const CourseCard = ({ image, courseName, price, rating }) => {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={courseName}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">

        <div>
          <h3 onClick={()=>Navigate('/course-list')} className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
            {courseName}
          </h3>

          <div className="flex items-center gap-2 text-yellow-500 mb-3">
             <span className="text-slate-600 font-medium"></span><Rating rating={rating} />
          </div>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold text-lg">
            ₹{price}
          </span>

          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition">
            Enroll
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;