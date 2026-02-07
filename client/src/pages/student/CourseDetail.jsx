import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CourseDropdown from '../../component/student/CourseDropdown.jsx'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react'

const CourseDetail = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, isSignedIn, isLoaded } = useUser()

  const [myCourse, setMyCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:8087/all-courses`)
        const data = await res.json()
        
        // Find the specific course inside the useEffect to avoid infinite loops
        const foundCourse = data.find(elem => elem.course_id == courseId)
        
        if (foundCourse) {
          setMyCourse(foundCourse)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [courseId]) // Runs only when component mounts or courseId changes

  function handleEnrollClick() {
    if (!isSignedIn) {
      toast.error("Please login or signup to enroll")
      navigate('/sign-up')
    } else {
      navigate(`/course-list/${courseId}/enroll-to-course`)
    }
  }

  // Handle loading state
  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading course content...</p>
      </div>
    )
  }

  // Handle case where course ID doesn't exist in the list
  if (!myCourse) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Course not found.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* LEFT SIDE */}
      <div className="flex flex-col w-full md:w-1/2 p-10 space-y-10">
        <div className='flex flex-col space-y-4'>
          <h1 className="text-3xl font-bold text-gray-900">
            {myCourse.course_title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">
            {myCourse.course_headings}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {myCourse.course_description}
          </p>
          <p className="text-orange-500 font-bold">
            Rating: ★★★★★ (5.0)
          </p>
        </div>

        {/* COURSE STRUCTURE */}
        <div className='w-full'>
          <h2 className="text-2xl font-bold mb-5">Course Structure</h2>
          <CourseDropdown courseContent={myCourse.course_content ? JSON.parse(myCourse.course_content) : [
            {
              "chapterId": "chapter1",
              "chapterTitle": "Cybersecurity Basics",
              "chapterContent": [
                { "lectureId": "lec1", "lectureTitle": "Introduction", "lectureDuration": 700 },
                { "lectureId": "lec2", "lectureTitle": "Threats", "lectureDuration": 750 }
              ]
            }
          ]} />
        </div>
      </div>

      {/* RIGHT SIDE - Enrollment Card */}
      <div className="flex flex-col w-full md:w-1/2 items-center p-10 bg-gray-50">
        <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md space-y-6 sticky top-10">
          <img
            className="w-full h-56 object-cover rounded-lg"
            src={`http://localhost:8087/getImage?courseId=${myCourse.course_id}`}
            alt="course thumbnail"
          />

          <div className="text-red-600 text-sm font-bold animate-pulse text-center">
            ⏰ Limited time offer: 5 days left!
          </div>

          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl font-extrabold text-gray-900">$39.99</span>
            <span className="line-through text-gray-400 text-xl">$49.99</span>
            <span className="text-blue-600 font-bold text-lg">20% OFF</span>
          </div>

          <div className="flex justify-between border-y py-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">★ 5.0</div>
            <div className="flex items-center gap-1">🕒 1h 5m</div>
            <div className="flex items-center gap-1">📘 {myCourse.totalLessons ?? 4} lessons</div>
          </div>

          <button 
            onClick={handleEnrollClick} 
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform active:scale-95 shadow-md"
          >
            Enroll Now
          </button>

          <div className="w-full pt-4">
            <h3 className="font-bold text-gray-800 mb-3">Course Features:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Lifetime access to content</li>
              <li>✅ Hands-on project guidance</li>
              <li>✅ Downloadable resources</li>
              <li>✅ Completion certificate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail