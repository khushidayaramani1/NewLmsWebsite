import React from 'react'
// Ensure these paths are correct relative to this file
import accenture from '../../assets/assets/accenture_logo.svg'
import microsoft from '../../assets/assets/microsoft_logo.svg'
import walmart from '../../assets/assets/walmart_logo.svg'
import adobe from '../../assets/assets/adobe_logo.svg'
import paypal from '../../assets/assets/paypal_logo.svg'

const Companies = () => {
  // 1. Define the array INSIDE the component so it has access to the imports
  const logos = [
    { src: microsoft, alt: "Microsoft" },
    { src: walmart, alt: "Walmart" },
    { src: accenture, alt: "Accenture" },
    { src: adobe, alt: "Adobe" },
    { src: paypal, alt: "PayPal" },
  ];

  return (
    <div className='flex flex-col items-center justify-center px-6 py-10'>
      <p className='text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-12 opacity-70'>
        Trusted by learners at
      </p>
      
      {/* Aesthetic Logo Cloud */}
      <div className='flex flex-wrap justify-center items-center gap-10 md:gap-20 max-w-6xl w-full'>
        {logos.map((logo, index) => (
          <div key={index} className="group">
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className='h-7 sm:h-9 md:h-11 w-auto object-contain filter grayscale brightness-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500 cursor-pointer transform group-hover:scale-110' 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Companies;