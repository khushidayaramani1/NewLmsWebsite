import React from 'react'
import sktech from "../../assets/assets/sktech.svg";
import SearchBar from './SearchBar';
const Hero = () => {
  
  return (
    <div className='pt-24 sm:pt-32 flex flex-col justify-center items-center space-y-6 sm:space-y-8 bg-gradient-to-b from-cyan-100/70 to-white px-2 sm:px-4'>
      <div className='w-full max-w-2xl text-center relative'>
        <h1 className='font-bold text-2xl sm:text-4xl md:text-5xl leading-tight'>Empower your future with the courses designed to<span className='text-blue-600'> fit your Choice.</span>
          <img src={sktech} alt="sketch" className='hidden md:block right-20 -bottom-7 absolute' />
        </h1>
      </div>
      <div className='w-full max-w-xl text-center text-base sm:text-lg md:text-xl text-gray-500'>We bring together world class instructor, interactive content, and a supportive community to help you achieve your personal and professional goals</div>
      <div className='w-full max-w-lg'>
         <SearchBar/>
      </div>
    </div>
  )
}

export default Hero
