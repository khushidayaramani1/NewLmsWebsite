import React from 'react'
import {EducatorsCourses as courses} from "../../assets/assets/assets.js";
const Mycourses = () => {

  


  return (
    <div className=' text-2xl flex flex-col space-y-10!  '>
      <div className='font-semibold mb-4'>My Enrollements</div>
      <table className='w-full text-left'>
        <thead className="border-b border-gray-500">
          <tr>
            <th className="pb-2 px-6">My Courses</th>
            <th className="pb-2 px-6">Earnings</th>
            <th className="pb-2 px-6">Student</th>
            <th className="pb-2 px-6">Published On</th>
          </tr>
        </thead>  

        <tbody className='divide-y divide-gray-200'>
          {courses.map((elem, index) => (
            <tr key={index}>
              <td className='py-4 px-6'>
                <div className='flex items-center gap-x-5'>
                  <img className='w-24 h-14 object-cover' src={elem.thumbnail} alt="" />
                  <p className='text-lg'>{elem.title}</p>
                </div>
              </td>
              <td className='py-4 px-6 text-lg'>{elem.earnings}</td>
              <td className='py-4 px-6 text-lg'>{elem.students}</td>
              <td className='py-4 px-6 text-lg'>{elem.publishedOn}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Mycourses
