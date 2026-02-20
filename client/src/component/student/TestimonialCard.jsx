import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const TestimonialCard = ({ image, name, role, rating, text }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-white p-5 border-b border-slate-100">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-200"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-base">{name}</h3>
          <p className="text-sm text-slate-500">
            {role}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        
        {/* Rating */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) =>
            index < rating ? (
              <IoIosStar key={index} className="text-yellow-400" size={18} />
            ) : (
              <IoIosStarOutline key={index} className="text-slate-300" size={18} />
            )
          )}
        </div>

        {/* Review */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
          {text}
        </p>

        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors flex items-center gap-1 group">
          Read more
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
