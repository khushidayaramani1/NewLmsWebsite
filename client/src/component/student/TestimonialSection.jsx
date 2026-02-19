import TestimonialCard from "./TestimonialCard";
import user1 from "../../assets/assets/profile_img_1.png";
import user2 from "../../assets/assets/profile_img_2.png";
import user3 from "../../assets/assets/profile_img_3.png";
import { FaArrowRight } from "react-icons/fa";
import { dummyTestimonial as dummyTestimonials } from "../../assets/assets/assets.js";

const TestimonialSection = () => {
  return (
    <>
        <div className="my-10 sm:my-20 flex flex-col justify-center items-center space-y-8 sm:space-y-12 px-2 sm:px-4"> 
            <div className="flex flex-col justify-center items-center w-full max-w-2xl space-y-5 sm:space-y-7">
                <div className="font-semibold text-2xl sm:text-3xl">Testimonials</div>
                <div className="text-gray-600 text-center text-base sm:text-lg">Hear from our learners as they share their journeys of transformation, success, and how our
                    platform has made a difference in their lives.
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center items-center">
            {
                dummyTestimonials.map((elem, idx) => (
                    <TestimonialCard
                        key={elem.name || idx}
                        image={elem.image}
                        name={elem.name}
                        role={elem.role}
                        rating={elem.rating}
                        text={elem.feedback}
                    />
                ))
            }
            </div>
        </div>
    </>
  );
};

export default TestimonialSection;
