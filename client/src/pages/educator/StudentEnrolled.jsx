import React from 'react'
import {dummyStudentEnrolled as studentsEnrolled} from "../../assets/assets/assets.js";

const Mycourses = () => {
  const StudentData= studentsEnrolled;
  return (
    <div className=' text-2xl flex flex-col space-y-10!  '>
      <div className='font-semibold mb-4'>My Enrollements</div>
      <table className='w-full text-left'>
        <thead className="border-b border-gray-500">
          <tr>
            <th className="pb-2 px-6">Student Name</th>
            <th className="pb-2 px-6">Course Title</th>
            <th className="pb-2 px-6">Date</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200'>
          {StudentData.map((elem, index) => (
            <tr key={index}>
              <td className='py-4 px-6'>
                <div className='flex items-center gap-x-5'>
                  <img className='w-24 h-14 object-cover' src={elem.student.imageUrl} alt="" />
                  <p className='text-lg'>{elem.student.name}</p>
                </div>
              </td>
              <td className='py-4 px-6 text-lg'>{elem.courseTitle}</td>
              <td className='py-4 px-6 text-lg'>{elem.purchaseDate}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Mycourses

