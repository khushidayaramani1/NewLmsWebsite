import TestimonialCard from "./TestimonialCard";
import user1 from "../../assets/assets/profile_img_1.png";
import user2 from "../../assets/assets/profile_img_2.png";
import user3 from "../../assets/assets/profile_img_3.png";
import { FaArrowRight } from "react-icons/fa";
import { dummyTestimonial as dummyTestimonials } from "../../assets/assets/assets.js";

const TestimonialSection = () => {
  return (
    <div className="my-12 sm:my-16 md:my-20 flex flex-col justify-center items-center space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-6 md:px-8"> 
      <div className="flex flex-col justify-center items-center w-full max-w-3xl space-y-4 sm:space-y-6">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800">Testimonials</h2>
        <p className="text-gray-600 text-center text-sm sm:text-base md:text-lg leading-relaxed">Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mx-auto">
        {dummyTestimonials.map((elem, idx) => (
          <TestimonialCard
            key={elem.name || idx}
            image={elem.image}
            name={elem.name}
            role={elem.role}
            rating={elem.rating}
            text={elem.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
