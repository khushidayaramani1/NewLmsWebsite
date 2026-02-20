import React from 'react';
import SearchBar from './SearchBar';
import sktech from '../../assets/assets/sktech.svg';

const Hero = () => {
  return (
    <div className='bg-white relative pt-12 md:pt-20 pb-12 md:pb-20 px-6 md:px-8 lg:px-12 flex flex-col items-center overflow-hidden w-full'>
      
      {/* Background Gradient */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-cyan-50/30 to-transparent -z-10' />
      
      <div className='max-w-5xl w-full text-center flex flex-col items-center mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 md:mb-8'>
          Empower your future with courses designed to 
          <span className='relative inline-block ml-2 text-blue-600 italic whitespace-nowrap'>
            fit your choice.
            <img 
              src={sktech} 
              alt="sketch" 
              className='hidden lg:block absolute -bottom-4 left-0 w-full opacity-60 pointer-events-none' 
            />
          </span>
        </h1>
        
        <p className='max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed font-light mb-8 md:mb-10 px-4'>
          We bring together world-class instructors and interactive content to help you achieve your goals.
        </p>

        <div className='w-full max-w-2xl flex justify-center px-4'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Hero;