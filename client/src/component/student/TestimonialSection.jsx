import TestimonialCard from "./TestimonialCard";
import user1 from "../../assets/assets/profile_img_1.png";
import user2 from "../../assets/assets/profile_img_2.png";
import user3 from "../../assets/assets/profile_img_3.png";
import { FaArrowRight } from "react-icons/fa";
import { dummyTestimonial as dummyTestimonials } from "../../assets/assets/assets.js";

const TestimonialSection = () => {
  return (
    <>
        <div className="my-20! flex flex-col justify-center items-center space-y-12!"> 
            <div className="flex flex-col justify-center items-center w-1/2 space-y-7!">
                <div className="font-semibold text-3xl">Testimonials</div>
                <div className="text-gray-600 text-center">Hear from our learners as they share their journeys of transformation, success, and how our
                    platform has made a difference in their lives.
                </div>
            </div>
            <div className="flex gap-6">
            
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
