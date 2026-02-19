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

    <div className='w-full px-2 sm:px-4 md:px-8 lg:px-24 pt-6 sm:pt-10 flex flex-col space-y-6 sm:space-y-10'>
      <div className='font-semibold mb-2 sm:mb-4 text-xl sm:text-2xl'>My Enrollments</div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className='min-w-[600px] w-full text-left text-base sm:text-lg bg-white'>
          <thead className="border-b border-gray-500 bg-gray-50">
            <tr>
              <th className="pb-2 px-2 sm:px-6">Student Name</th>
              <th className="pb-2 px-2 sm:px-6">Course Title</th>
              <th className="pb-2 px-2 sm:px-6">Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.map((elem, index) => (
              <tr key={index}>
                <td className='py-3 px-2 sm:px-6'>
                  <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-5'>
                    <img className='w-20 h-12 sm:w-24 sm:h-14 object-cover rounded' src={user.imageUrl}  alt="here will be image" />
                    <p className='text-base sm:text-lg text-center sm:text-left'>{elem.user_name}</p>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6 text-base sm:text-lg text-center'>{elem.course_title}</td>
                <td className='py-3 px-2 sm:px-6 text-base sm:text-lg text-center'>date</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mycourses

