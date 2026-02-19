import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import course_1 from '../../assets/assets/course_1.png'
import course_2 from '../../assets/assets/course_2.png'
import course_3 from '../../assets/assets/course_3.png'
import course_4 from '../../assets/assets/course_4.png'
const CourseSection = () => {
  return (
    <>
        <div className='mt-4 sm:mt-5 flex flex-col text-center justify-center items-center space-y-4 sm:space-y-5 px-2 sm:px-4'>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-800">
            Learn from the best
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mt-2 leading-relaxed">
            Discover our top-rated courses across various categories. 
            From coding and design to business and wellness, our courses 
            are crafted to deliver results.
          </p>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full'> 
            <CourseCard image={course_1} courseName="Build Text to image SaaS App in React JS" rating="4" price="67.8"/>
            <CourseCard image={course_2} courseName="Build Text to image SaaS App in React JS" rating="4" price="67.8"/>
            <CourseCard image={course_3} courseName="Cybersecurity Basics" rating="4.5" price="59.49"/>
            <CourseCard image={course_4} courseName="Web Development Bootcamp" rating="4.5" price="74.99"/>
          </div>
          <Link onClick={()=>scrollTo(0,0)} className="mt-8 rounded-sm border border-gray-500 py-2 px-4 text-gray-500 text-sm sm:text-base" to="/course-list">Show all Courses</Link>
        </div>
    </>
  )
}
export default CourseSection
