import React, { useContext } from 'react'
import { IoIosStar } from "react-icons/io";
import { AppContext } from '../../context/AppContext';

const CourseCard = (props) => {
  const currency = useContext(AppContext)
  return (
    <>  
       
        <div className='w-max border rounded-lg h-80'>
            <img src={props.image} alt="course_1" className='w-full h-2/4 rounded-lg' />
            <div className='flex flex-col flex-initial items-start gap-1 w-3/4 my-3! mx-2!'>
              <h4 className='font-semibold text-left'>{props.courseName}</h4>
              <p className='text-gray-500 font-medium'>GreatStack</p>
              <div className='flex items-center'>
                <p>{props.rating}</p>
                 {Array.from({ length: 5 }).map((_, index) => (
                  <IoIosStar
                  key={index}
                  className={index < props.rating ? "text-[#FF4500]" : "text-gray-300"}
                />
                ))}
                {/* We convert the number into an iterable array using Array.from so we can use map. */}
                <p>({props.rating})</p>
              </div>
              <p className='font-semibold'>{currency}{props.price}</p>
            </div>
        </div>
       
    </>
  )
}

export default CourseCard
