import React, { useContext } from 'react'
import { IoIosStar } from "react-icons/io";
import { AppContext } from '../../context/AppContext';

const CourseCard = (props) => {
  const currency = useContext(AppContext)
  return (
    <div className='w-full sm:w-72 md:w-80 lg:w-72 xl:w-80 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <img src={props.image} alt="course" className='w-full h-40 sm:h-48 object-cover' />
      <div className='flex flex-col items-start gap-2 p-3 sm:p-4'>
        <h4 className='font-semibold text-left text-xs sm:text-sm line-clamp-2'>{props.courseName}</h4>
        <p className='text-gray-500 font-medium text-xs sm:text-sm'>GreatStack</p>
        <div className='flex items-center gap-1 text-xs sm:text-sm'>
          <span className='font-medium'>{props.rating}</span>
          <div className='flex items-center'>
            {Array.from({ length: 5 }).map((_, index) => (
              <IoIosStar
                key={index}
                size={14}
                className={index < props.rating ? "text-[#FF4500]" : "text-gray-300"}
              />
            ))}
          </div>
          <span className='text-gray-400'>({props.rating})</span>
        </div>
        <p className='font-semibold text-sm sm:text-base'>{currency}{props.price}</p>
      </div>
    </div>
  )
}

export default CourseCard
