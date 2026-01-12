import React, { useState, useEffect } from 'react'
import { Navigate, useParams,useNavigate } from 'react-router-dom'
import { dummyCourses } from "../../assets/assets/assets.js"
import CourseDropdown from '../../component/student/CourseDropdown.jsx'
// import { useParams } from 'react-router-dom'

const CourseDetail = () => {

  const { courseId } = useParams()
  const [myCourse, setMyCourse] = useState(null)
  const navigate = useNavigate()  

  useEffect(() => {
    const foundCourse = dummyCourses.find(
      (course) => course.id === courseId
    )
    setMyCourse(foundCourse)
  }, [courseId])

  // ⛑ safety
  if (!myCourse) return <p>Loading course...</p>

  function handleEnrollClick(){
    navigate(`/course-list/${courseId}/enroll-to-course`)
  }

  return (
    <>
    <div className='flex'> 
    <div className="flex flex-col w-1/2 p-5 space-y-10!">

      {/* LEFT TOP */}
      <div className='flex flex-col space-y-4!'>
        <h1 className="text-xl font-bold">
          {myCourse.courseTitle}
        </h1>

        <h2 className="text-lg font-semibold">
          {myCourse.courseDescription.heading}
        </h2>

        <p>{myCourse.courseDescription.para1}</p>
        <p>{myCourse.courseDescription.para2}</p>

        <p className="mt-2">
          Rating: {myCourse.courseRatings?.[0]?.rating ?? "No ratings yet"}
        </p>
      </div>

      {/* COURSE STRUCTURE */}
      <div className='w-screen'>
        <h2 className="text-lg font-semibold">Course Structure</h2>
        <CourseDropdown courseContent={myCourse.courseContent} />
      </div>

      {/* left bottom */}

      <div className='flex flex-col space-y-6!'>
        <ul className="list-disc ml-5">
          {myCourse.courseDescription.bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="mt-2">
          Rating: {myCourse.courseRatings?.[0]?.rating ?? "No ratings yet"}
        </p>
      </div>

    </div>
     
      {/* RIGHT SIDE - Placeholder for future content */}
     
      <div className="border flex flex-col w-1/2 items-center p-4 space-y-4">
        {/* Thumbnail */}
        <img
          className="w-3/4 h-1/2 object-cover rounded"
          src={myCourse.courseThumbnail}
          alt="course thumbnail"
        />

        {/* Offer text */}
        <div className="text-red-600 text-sm font-medium">
          ⏰ 5 days left at this price!
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">$39.99</span>
          <span className="line-through text-gray-400">$49.99</span>
          <span className="text-blue-600 font-medium">20% off</span>
        </div>

        {/* Rating / Duration / Lessons */}
        <div className="flex gap-4 text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <span className="text-orange-500">★</span>
            <span>{myCourse.courseRatings?.[0]?.rating ?? 0}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>🕒</span>
            <span>1 hour, 5 minutes</span>
          </div>

          <div className="flex items-center gap-1">
            <span>📘</span>
            <span>{myCourse.totalLessons ?? 4} lessons</span>
          </div>

        </div>

        {/* Enroll Button */}
        <button onClick={handleEnrollClick} className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Enroll Now
        </button>

        {/* Course includes */}
        <div className="w-full">
          <h3 className="font-semibold text-lg mb-2">
            What's in the course?
          </h3>

          <ul className="list-disc ml-5 text-gray-700 space-y-1 text-sm">
            <li>Lifetime access with free updates</li>
            <li>Step-by-step, hands-on project guidance</li>
            <li>Downloadable resources and source code</li>
            <li>Quizzes to test your knowledge</li>
            <li>Certificate of completion</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default CourseDetail
