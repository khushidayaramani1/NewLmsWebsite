import React from 'react'
import sktech from "../../assets/assets/sktech.svg";
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className='relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 flex flex-col items-center bg-white overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-50 via-transparent to-transparent -z-10' />
      
      <div className='max-w-4xl text-center space-y-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]'>
          Empower your future with courses designed to 
          <span className='relative inline-block ml-2 text-blue-600 italic'>
            fit your Choice.
            <img src={sktech} alt="sketch" className='hidden lg:block absolute -bottom-4 left-0 w-full opacity-60' />
          </span>
        </h1>
        
        <p className='max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-light'>
          We bring together world-class instructors, interactive content, and a supportive community to help you achieve your goals.
        </p>

        <div className='w-full max-w-xl mx-auto pt-4 transition-transform duration-500 hover:scale-[1.02]'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default Hero