import React from 'react'
import {EducatorsCourses as courses} from "../../assets/assets/assets.js";
const Mycourses = () => {

  


  return (
    <div className='w-full px-2 sm:px-4 md:px-8 lg:px-24 pt-6 sm:pt-10 flex flex-col space-y-6 sm:space-y-10'>
      <div className='font-semibold mb-2 sm:mb-4 text-xl sm:text-2xl'>My Enrollments</div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className='min-w-[600px] w-full text-left text-base sm:text-lg bg-white'>
          <thead className="border-b border-gray-500 bg-gray-50">
            <tr>
              <th className="pb-2 px-2 sm:px-6">My Courses</th>
              <th className="pb-2 px-2 sm:px-6">Earnings</th>
              <th className="pb-2 px-2 sm:px-6">Student</th>
              <th className="pb-2 px-2 sm:px-6">Published On</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {courses.map((elem, index) => (
              <tr key={index}>
                <td className='py-3 px-2 sm:px-6'>
                  <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-5'>
                    <img className='w-20 h-12 sm:w-24 sm:h-14 object-cover rounded' src={elem.thumbnail} alt="" />
                    <p className='text-base sm:text-lg text-center sm:text-left'>{elem.title}</p>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6 text-base sm:text-lg text-center'>{elem.earnings}</td>
                <td className='py-3 px-2 sm:px-6 text-base sm:text-lg text-center'>{elem.students}</td>
                <td className='py-3 px-2 sm:px-6 text-base sm:text-lg text-center'>{elem.publishedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mycourses
