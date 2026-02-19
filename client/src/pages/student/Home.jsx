import React from 'react'
import Hero from '../../component/student/Hero'
import Companies from '../../component/student/Companies'
import CourseCard from '../../component/student/CourseCard'
import CourseSection from '../../component/student/CourseSection'
import CallToAction from '../../component/student/CallToAction'
import TestimonialSection from '../../component/student/TestimonialSection'
import Footer from '../../component/student/Footer'
const Home = () => {
  return (
    <div className='w-full'>
      <Hero/>
      <div className='bg-white py-8 sm:py-12 md:py-16'>
        <Companies/>
      </div>
      <div className='bg-gray-50 py-12 sm:py-16 md:py-20'>
        <CourseSection/>
      </div>
      <div className='bg-white py-12 sm:py-16 md:py-20'>
        <CallToAction/>
      </div>
      <div className='bg-gray-50 py-12 sm:py-16 md:py-20'>
        <TestimonialSection/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home;
