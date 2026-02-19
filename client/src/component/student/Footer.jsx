import React from 'react'
import logo from "../../assets/assets/logo_dark.svg";

const Footer = () => {
  return (
    <div className='w-full bg-gray-900 text-white px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-6xl mx-auto mb-8'>
        <div className='flex flex-col space-y-4 text-gray-200 items-center sm:items-start'>
          <img src={logo} alt="logo" className='w-20 h-20 object-contain'/>
          <p className='text-center sm:text-left text-xs sm:text-sm leading-relaxed'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
        </div>
        <div className='flex flex-col text-gray-200 items-center sm:items-start'>
          <div className='font-semibold text-base sm:text-lg mb-4'>Company</div>
          <div className='flex flex-col text-center sm:text-left gap-2 text-sm'>
            <p className='hover:text-blue-400 cursor-pointer transition-colors'>Home</p>
            <p className='hover:text-blue-400 cursor-pointer transition-colors'>About us</p>
            <p className='hover:text-blue-400 cursor-pointer transition-colors'>Contact us</p>
            <p className='hover:text-blue-400 cursor-pointer transition-colors'>Privacy policy</p>
          </div>
        </div>
        <div className='flex flex-col space-y-4 text-gray-200 items-center sm:items-start col-span-1 sm:col-span-2 lg:col-span-2'>
          <p className='font-semibold text-base sm:text-lg'>Subscribe to our newsletter</p>
          <div className='w-full'>
            <p className='text-center sm:text-left text-xs sm:text-sm mb-3 leading-relaxed'>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-2 w-full'>
              <input type="email" className='border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 text-sm flex-1 focus:outline-none focus:border-blue-500' placeholder='Enter your email' />
              <button className='rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium text-sm transition-colors whitespace-nowrap'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t border-gray-700 pt-6 text-center text-gray-400 text-xs sm:text-sm'>
        <p>&copy; 2026 All Rights Reserved | LMS Platform</p>
      </div>
    </div>
  )
}

export default Footer

 
