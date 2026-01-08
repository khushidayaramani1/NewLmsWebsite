import React from 'react'
import Hero from '../../component/student/Hero'
import Companies from '../../component/student/Companies'
import CourseCard from '../../component/student/CourseCard'
import CourseSection from '../../component/student/CourseSection'
import TestimonialSection from '../../component/student/TestimonialSection'
import Footer from '../../component/student/Footer'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Companies/>
      <CourseSection/>
      <TestimonialSection/>
      <Footer/>
    </div>
  )
}

export default Home
