import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const MyEnrollement = () => {
  // Combined the Clerk calls into one clean line
  const { isSignedIn, isLoaded, user } = useUser()
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])  

  /* 🔐 FETCH ENROLLED COURSE IDS */
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return

    console.log(user.id + "-------------")
    
    fetch(`http://localhost:8087/getAllCourses/${user.id}`)
      .then(res => res.json())
      .then(data => {
        // Assuming your backend returns an object with a courseIds list
        setEnrolledCourseIds(data.courseIds || [])
      }) 
      .catch(err => console.error(err))
  }, [isLoaded, isSignedIn, user])

  

  useEffect(() => {
  if (enrolledCourseIds.length === 0) return;

  // 1. Create an array of fetch promises
  const fetchPromises = enrolledCourseIds.map(id =>
    fetch(`http://localhost:8087/get-by-id/${id}`).then(res => {
      if (!res.ok) throw new Error(`Failed to fetch course ${id}`);
      return res.json();
    })
  );

  // 2. Wait for ALL of them to finish
  Promise.all(fetchPromises)
    .then(allCourseData => {
      console.log("All courses fetched:", allCourseData);
      setCourses(allCourseData); // Set the state ONCE with the full array
    })
    .catch(err => console.error("One or more fetches failed:", err));
    
}, [enrolledCourseIds]); // Runs whenever the list of IDs changes

  /* ⏱ DURATION CALC */
  // const calcDuration = (course) => {
  //   let total = 0
  //   course.courseContent.forEach(chapter => {
  //     chapter.chapterContent.forEach(lecture => {
  //       total += lecture.lectureDuration
  //     })
  //   })
  //   return total
  // }

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
          {/* Note: Ensure you import or define your course data source here */}
          {courses.map((course, index) => {
            // const duration = calcDuration(course)
            return (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4">
                  <div className="flex items-center gap-x-5">
                    <img
                      className="w-24 h-14 object-cover"
                      src={`http://localhost:8087/getImage?courseId=${course.courseId}`}
                      alt=""
                    />
                    <p
                      onClick={() => navigate(`/player/${course.courseId}`)}
                      className="text-lg cursor-pointer hover:underline"
                    >
                      {course.courseTitle}
                    </p>
                  </div>
                </td>

                <td className="py-4 text-lg">
                  {/* {Math.floor(duration / 60)} hrs {duration % 60} }mins */}
                  60 mins hardcoded
                </td>

                <td className="py-4 text-lg">
                  {/* 0 / {course.courseContent.length} */}
                  0 / 4 hardcoded
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