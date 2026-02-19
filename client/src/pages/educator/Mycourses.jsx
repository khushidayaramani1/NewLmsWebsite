import React from 'react'
import {EducatorsCourses as courses} from "../../assets/assets/assets.js";
const Mycourses = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 flex flex-col space-y-6 sm:space-y-8'>
      <div className='font-semibold mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl'>My Courses</div>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
        <table className='min-w-full w-full text-left bg-white'>
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-bold text-gray-700 text-xs sm:text-sm md:text-base">Courses</th>
              <th className="py-3 px-4 sm:px-6 text-center font-bold text-gray-700 text-xs sm:text-sm md:text-base">Earnings</th>
              <th className="py-3 px-4 sm:px-6 text-center font-bold text-gray-700 text-xs sm:text-sm md:text-base">Students</th>
              <th className="py-3 px-4 sm:px-6 text-center font-bold text-gray-700 text-xs sm:text-sm md:text-base hidden sm:table-cell">Published</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {courses.map((elem, index) => (
              <tr key={index} className='hover:bg-gray-50 transition-colors'>
                <td className='py-4 px-4 sm:px-6'>
                  <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3'>
                    <img className='w-14 h-8 sm:w-20 sm:h-12 md:w-28 md:h-16 object-cover rounded' src={elem.thumbnail} alt="" />
                    <p className='text-xs sm:text-sm md:text-base font-medium text-center sm:text-left line-clamp-2'>{elem.title}</p>
                  </div>
                </td>
                <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base text-center font-semibold text-blue-600'>{elem.earnings}</td>
                <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base text-center'>{elem.students}</td>
                <td className='py-4 px-4 sm:px-6 text-xs sm:text-sm md:text-base text-center hidden sm:table-cell text-gray-600'>{elem.publishedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mycourses
