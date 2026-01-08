import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const TestimonialCard = ({ image, name, role, company, rating, text }) => {
  return (
    <div className="w-80  border-gray-600 rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 bg-gray-100 p-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">
            {role} @ {company}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        
        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) =>
            index < rating ? (
              <IoIosStar key={index} className="text-[#FF4500]" />
            ) : (
              <IoIosStarOutline key={index} className="text-gray-400" />
            )
          )}
        </div>

        {/* Review */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {text}
        </p>

        <button className="text-blue-500 text-sm font-medium">
          Read more
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
