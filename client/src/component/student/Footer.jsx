import React from 'react'
import logo from "../../assets/assets/logo_dark.svg";

const Footer = () => {
  return (
    <div className='w-full bg-gray-900 text-white px-2 sm:px-4 pt-8 pb-4'>
      <div className='flex flex-col md:flex-row items-center md:items-start justify-between max-w-6xl mx-auto gap-8'>
      <div className='flex flex-col space-y-3 sm:space-y-5 text-gray-100 w-full md:w-1/4 items-center md:items-start'>
        <img src={logo} alt="" className='w-20 h-20 mb-2'/>
        <p className='text-center md:text-left text-sm sm:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
      </div>
      <div className='flex flex-col text-gray-100 w-full md:w-1/4 items-center md:items-start'>
        <div className='font-semibold mb-2'>Company</div>
        <div className='flex flex-col text-center md:text-left gap-1'>
          <p>Home</p>
          <p>About us</p>
          <p>Contact us</p>
          <p>Privacy policy</p>
        </div>
      </div>
      <div className='flex flex-col space-y-3 sm:space-y-5 text-gray-100 w-full md:w-1/4 items-center md:items-start'>
        <p className='font-semibold'>Subscribe to our newsletter</p>
        <div className='w-full'>
          <p className='text-center md:text-left text-xs sm:text-sm mb-2'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-5 w-full'>
            <input type="text" className='border border-gray-500 rounded px-2 py-1 w-full sm:w-auto' placeholder='Enter your email' />
            <button className='rounded-md bg-blue-500 text-white px-4 py-2 w-full sm:w-auto'>Subscribe</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Footer

 
