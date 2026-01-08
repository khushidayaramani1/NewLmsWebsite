import React from 'react'
import { dummyCourses } from "../../assets/assets/assets.js"

const MyEnrollement = () => {

  const data = dummyCourses

  const calcDuration = (course) => {
    let total = 0;
    // We iterate through Course -> Chapters -> Lectures
    course.courseContent.forEach((chapter) => {
       chapter.chapterContent.forEach((lecture) => {
          total += lecture.lectureDuration
       })
    })
    return total;
  }

  return (
     
    <div className='px-36 pt-10 text-2xl flex flex-col space-y-10!'>
      <div className='font-semibold mb-4'>My Enrollements</div>
      <table className='w-full text-left'>
        <thead className='border-b border-gray-500'>
          <tr>
            <th className='pb-2'>Course</th>
            <th className='pb-2'>Duration</th>
            <th className='pb-2'>Completed</th>
            <th className='pb-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          { 
            data.map((elem, index) => {
              // FIX 1: Calculate duration here (before the return)
              const duration = calcDuration(elem);
              
              return(
                <tr key={index} className='border-b border-gray-200'>
                  {/* FIX 2: Use <td> for body, not <th> */}
                  <td className='py-4'>
                    <div className='flex items-center gap-x-5'>
                      <img className='w-24 h-14 object-cover' src={elem.courseThumbnail} alt="" />
                      <p className='text-lg'>{elem.courseTitle}</p>
                    </div>
                  </td>
                  <td className='py-4 text-lg'>
                    {/* FIX 3: Use the variable we calculated above */}
                    {Math.floor(duration/60)} hrs {duration % 60} mins
                  </td>
                  <td className='py-4 text-lg'>
                      {/* Placeholder */}
                      0 / {elem.courseContent.length}
                  </td>
                  <td className='py-4 text-lg'>
                      {/* Placeholder */}
                      On Going
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
export default MyEnrollement