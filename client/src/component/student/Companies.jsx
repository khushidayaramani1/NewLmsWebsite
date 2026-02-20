import React from 'react';
import microsoft from '../../assets/assets/microsoft_logo.svg'; 
import walmart from '../../assets/assets/walmart_logo.svg'; 
import accenture from '../../assets/assets/accenture_logo.svg';
import adobe from '../../assets/assets/adobe_logo.svg';

const Companies = () => {
  const logos = [
    { src: microsoft, alt: "Microsoft", url: "https://www.microsoft.com" },
    { src: walmart, alt: "Walmart", url: "https://www.walmart.com" },
    { src: accenture, alt: "Accenture", url: "https://www.accenture.com" },
    { src: adobe, alt: "Adobe", url: "https://www.adobe.com" },
  ];

  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-3 md:py-6 bg-white'>
      <p className='text-blue-600 text-xl  font-bold uppercase tracking-[0.3em] text-center mb-10!'>
        Trusted by learners at
      </p>
      
      <div className='flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-20 w-full max-w-6xl'>
        {logos.map((logo, index) => (
          <a 
            key={index} 
            href={logo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100"
          >
            <img 
              src={logo.src} 
              alt={logo.alt} 
              className='h-7 sm:h-8 md:h-10 w-auto object-contain   group-hover:grayscale-0 transition-all duration-300' 
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default Companies;