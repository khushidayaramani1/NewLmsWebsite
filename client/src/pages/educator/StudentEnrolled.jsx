import React, { useEffect,useState } from 'react'
import {dummyStudentEnrolled as studentsEnrolled} from "../../assets/assets/assets.js";
import { useUser } from '@clerk/clerk-react';

const Mycourses = () => {
  const StudentData= studentsEnrolled;
  const { user } = useUser();
  const [data,setData]= useState([])

  useEffect(()=>{
    fetch('http://localhost:8087/get-username-coursename-by-id')
    .then((res)=>res.json())
    .then((data)=>setData(data))
  },[])

  return (

    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 flex flex-col space-y-6 sm:space-y-8'>
      <div className='font-semibold mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl'>Student Enrollments</div>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
        <table className='min-w-full w-full text-left bg-white'>
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 text-xs sm:text-sm md:text-base">Student Name</th>
              <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 text-xs sm:text-sm md:text-base text-center">Course Title</th>
              <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 text-xs sm:text-sm md:text-base text-center">Enrollment Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.map((elem, index) => (
              <tr key={index} className='hover:bg-gray-50 transition-colors'>
                <td className='py-4 px-4 sm:px-6'>
                  <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4'>
                    <img className='w-16 h-10 sm:w-20 sm:h-12 object-cover rounded' src={user?.imageUrl}  alt="profile" />
                    <p className='text-xs sm:text-sm md:text-base font-medium text-center sm:text-left'>{elem.user_name}</p>
                  </div>
                </td>
                <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base text-center'>{elem.course_title}</td>
                <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base text-center text-gray-600'>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mycourses

