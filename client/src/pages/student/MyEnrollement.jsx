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

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center p-4 text-lg">Loading...</div>;
  if (!isSignedIn) return <div className="min-h-screen flex items-center justify-center p-4 text-lg">Please login</div>;

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-24 pt-6 sm:pt-10 flex flex-col space-y-6 sm:space-y-10">
      <div className="font-semibold mb-2 sm:mb-4 text-xl sm:text-2xl">My Enrollments</div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[600px] w-full text-left text-base sm:text-lg bg-white">
          <thead className="border-b border-gray-500 bg-gray-50">
            <tr>
              <th className="pb-2 px-2 sm:px-4">Course</th>
              <th className="pb-2 px-2 sm:px-4">Duration</th>
              <th className="pb-2 px-2 sm:px-4">Completed</th>
              <th className="pb-2 px-2 sm:px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                      <img
                        className="w-20 h-12 sm:w-24 sm:h-14 object-cover rounded"
                        src={`http://localhost:8087/getImage?courseId=${course.courseId}`}
                        alt=""
                      />
                      <p
                        onClick={() => navigate(`/player/${course.courseId}`)}
                        className="text-base sm:text-lg cursor-pointer hover:underline text-center sm:text-left"
                      >
                        {course.courseTitle}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-lg text-center">60 mins hardcoded</td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-lg text-center">0 / 4 hardcoded</td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-lg text-blue-600 text-center">On Going</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEnrollement