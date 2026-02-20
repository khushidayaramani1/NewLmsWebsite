import React from 'react'
import Hero from '../../component/student/Hero'
import Companies from '../../component/student/Companies'
import CourseSection from '../../component/student/CourseSection'
import CallToAction from '../../component/student/CallToAction'
import TestimonialSection from '../../component/student/TestimonialSection'
import Footer from '../../component/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen w-full overflow-x-hidden antialiased bg-white'>
      <main className='w-full'>
        
        {/* Hero Section */}
        <Hero />

        {/* Companies Section - Tight transition with a subtle border */}
        <section className='border-b border-slate-50'>
           <Companies />
        </section>

        {/* Course Section - Background color provides visual block separation */}
        <section className='bg-slate-50/50'>
            <CourseSection />
        </section>

        {/* Call To Action */}
        <CallToAction />

        {/* Testimonials */}
        <section className='bg-slate-50/30'>
            <TestimonialSection />
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Home;