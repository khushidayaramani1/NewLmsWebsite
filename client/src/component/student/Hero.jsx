import React from 'react'
import sktech from "../../assets/assets/sktech.svg";
import SearchBar from './SearchBar';
const Hero = () => {
  
  return (
    <div className='pt-36! flex flex-col justify-center items-center space-y-8! bg-gradient-to-b from-cyan-100/70   to-white'>
      <div className='w-2/3 text-center relative'> 
        <h1 className='font-bold text-5xl'>Empower your future with the courses designed to<span className='text-blue-600'> fit your Choice.</span>
        <img src={sktech} alt="sketch" className='hidden md:block right-55 -bottom-7 absolute' />
        </h1>
      </div> 
      <div className='w-1/2 text-center text-xl text-gray-500 '>We bring together world class instructor, interactive content, and a       supportive community to help you achieve your personal and professional goals</div>
      <div className='w-1/2'>
         <SearchBar/>
      </div>
    </div>
  )
}

export default Hero
