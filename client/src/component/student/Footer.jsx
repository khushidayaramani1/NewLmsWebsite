import React from 'react'
import logo from "../../assets/assets/logo_dark.svg";

const Footer = () => {
  return (
    <div>
      <div className='flex items-center justify-evenly bg-gray-900 text-white'>
        <div className='flex flex-col space-y-5 text-gray-100 w-1/4'>
            <img src={logo} alt="" className='w-25 h-25'/>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
        </div>
        <div className='flex flex-col  text-gray-100 w-1/4'>
            <div className='font-semibold h-25'>Company</div>
            <div className='flex flex-col'>
                <p>Home</p>
                <p>About us</p>
                <p>Contact us</p>
                <p>Privacy policy</p>
            </div>
        </div>
        <div className='flex flex-col space-y-5 text-gray-100 w-1/4'>
            <p className='font-semibold' >Subscribe to our newsletter</p>
            <div className=''>
                <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                <div className='flex gap-5'>
                    <input type="text " className=' border-gray-500' placeholder='Enter your email' />
                    <button className=' p-2! rounded-md bg-blue-500 text-white'>Subscribe</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

 
