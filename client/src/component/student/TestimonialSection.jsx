import React from "react";
import TestimonialCard from "./TestimonialCard";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { dummyTestimonial as dummyTestimonials } from "../../assets/assets/assets.js";

const TestimonialSection = () => {
  return (
    <section className="relative   overflow-hidden bg-white">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(59,130,246,0.05)_0%,rgba(255,255,255,0)_100%)] pointer-events-none" />

      <div className="gap-y-20! flex flex-col mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-y-3! items-center text-center mb-16 md:mb-24">
          <div className="inline-flex items-center my-6! px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-blue-200 border-2 border-white" />
              ))}  
            </div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">
              12k+ Happy Students
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Real Stories, <span className="text-blue-600">Real Success</span>
          </h2>
          
          <p className="max-w-2xl text-slate-500 text-lg md:text-xl font-light leading-relaxed">
            Discover how our community of learners transformed their careers and achieved their goals through our expert-led courses.
          </p>
        </div>

        {/* Improved Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyTestimonials.map((elem, idx) => (
            <div 
              key={idx} 
              className={`
                transition-all duration-500 hover:-translate-y-2
                ${idx === 1 ? 'lg:mt-8' : ''} // Creates a staggered "masonry" look on desktop
              `}
            >
              <div className="relative h-full">
                {/* Decorative Quote Icon behind the card */}
                <FaQuoteLeft className="absolute -top-4 -left-4 text-slate-100 text-6xl -z-10" />
                
                <TestimonialCard
                  image={elem.image}
                  name={elem.name}
                  role={elem.role}
                  rating={elem.rating}
                  text={elem.feedback}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action for Social Proof */}
        <div className="lg:my-10! pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1 text-orange-400 mb-2">
              {[...Array(5)].map((_, i) => <FaStar key={i} size={18} />)}
            </div>
            <p className="text-slate-900 font-bold text-lg">4.9/5 overall rating</p>
            <p className="text-slate-500 text-sm">Based on 2,500+ reviews from G2 and Trustpilot</p>
          </div>
          
          <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200">
            Read all 2,000+ reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;