import React, { useState, useEffect } from 'react'
import { dummyCourses } from "../../assets/assets/assets.js"
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const MyEnrollement = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])
  const navigate = useNavigate()

  /* 🔐 FETCH ENROLLED COURSE IDS */
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return

    fetch(`http://localhost:8087/getAllCourses/${user.id}`)
      .then(res => res.json())
      .then(data => {
        // ensure all ids are SAME TYPE
        const ids = data.map(id => String(id))
        setEnrolledCourseIds(ids)
      })
      .catch(err => console.error(err))
  }, [isLoaded, isSignedIn, user])

  /* ⏱ DURATION CALC */
  const calcDuration = (course) => {
    let total = 0
    course.courseContent.forEach(chapter => {
      chapter.chapterContent.forEach(lecture => {
        total += lecture.lectureDuration
      })
    })
    return total
  }

  if (!isLoaded) return <div className="p-10">Loading...</div>
  if (!isSignedIn) return <div className="p-10">Please login</div>

  return (
    <div className="px-36 pt-10 text-2xl flex flex-col space-y-10">
      <div className="font-semibold mb-4">My Enrollments</div>

      <table className="w-full text-left">
        <thead className="border-b border-gray-500">
          <tr>
            <th className="pb-2">Course</th>
            <th className="pb-2">Duration</th>
            <th className="pb-2">Completed</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {dummyCourses.map((course, index) => {
            const duration = calcDuration(course)

            if (!enrolledCourseIds.includes(String(course.id))) return null

            return (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4">
                  <div className="flex items-center gap-x-5">
                    <img
                      className="w-24 h-14 object-cover"
                      src={course.courseThumbnail}
                      alt=""
                    />
                    <p
                      onClick={() => navigate(`/player/${course.id}`)}
                      className="text-lg cursor-pointer hover:underline"
                    >
                      {course.courseTitle}
                    </p>
                  </div>
                </td>

                <td className="py-4 text-lg">
                  {Math.floor(duration / 60)} hrs {duration % 60} mins
                </td>

                <td className="py-4 text-lg">
                  0 / {course.courseContent.length}
                </td>

                <td className="py-4 text-lg text-blue-600">
                  On Going
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MyEnrollement
