import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const MyEnrollement = () => {
  const { isSignedIn, isLoaded, user } = useUser()
  const [courses, setCourses] = useState([])
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // 1. Fetch Enrolled IDs
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return

    fetch(`http://localhost:8087/getAllCourses/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setEnrolledCourseIds(data.courseIds || [])
      })
      .catch(err => console.error("Error fetching IDs:", err))
  }, [isLoaded, isSignedIn, user])

  // 2. Fetch full details for each course to calculate sync'd progress
  useEffect(() => {
    if (enrolledCourseIds.length === 0) {
      setLoading(false)
      return
    }

    const fetchCourseDetails = async () => {
      try {
        const enrichedData = await Promise.all(
          enrolledCourseIds.map(async (id) => {
            // Get Basic Data
            const metaRes = await fetch(`http://localhost:8087/get-by-id/${id}`);
            const course = await metaRes.json();

            // Get Chapters
            const chapterRes = await fetch(`http://localhost:8087/get-chapters/${id}`);
            let chapters = await chapterRes.json();
            if (!Array.isArray(chapters)) chapters = Object.values(chapters || {});

            // Get Lectures for each chapter (to count them correctly)
            let totalLectures = 0;
            await Promise.all(
              chapters.map(async (chap) => {
                const chapId = chap.chapter_id || chap.chapterId || chap.id;
                try {
                  const lecRes = await fetch(`http://localhost:8087/get-lecture-by-chapterId/${chapId}`);
                  const lecs = await lecRes.json();
                  totalLectures += Array.isArray(lecs) ? lecs.length : Object.values(lecs).length;
                } catch {
                  totalLectures += 0;
                }
              })
            );

            // Sync with LocalStorage
            const stored = localStorage.getItem(`course-${id}-completed`);
            const completedList = stored ? JSON.parse(stored) : [];

            return {
              ...course,
              completedCount: completedList.length,
              totalLectures: totalLectures,
              completionPercentage: totalLectures > 0 
                ? Math.min(Math.round((completedList.length / totalLectures) * 100), 100) 
                : 0
            };
          })
        );
        setCourses(enrichedData);
      } catch (err) {
        console.error("Master Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [enrolledCourseIds]);

  if (!isLoaded || loading) return <div className="min-h-screen flex items-center justify-center p-4 text-lg animate-pulse">Loading Enrollments...</div>;
  if (!isSignedIn) return <div className="min-h-screen flex items-center justify-center p-4 text-lg">Please login</div>;

  return (
    <div className="w-full px-4 md:px-8 lg:px-24 pt-10 flex flex-col space-y-10">
      <div className="font-semibold text-2xl">My Enrollments</div>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-100">
        <table className="min-w-[700px] w-full text-left bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 font-bold text-gray-700">Course</th>
              <th className="py-4 px-6 font-bold text-gray-700">Progress Bar</th>
              <th className="py-4 px-6 font-bold text-gray-700 text-center">Lessons</th>
              <th className="py-4 px-6 font-bold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-20 h-12 object-cover rounded shadow-sm"
                      src={`http://localhost:8087/getImage?courseId=${course.courseId}`}
                      alt=""
                    />
                    <p
                      onClick={() => navigate(`/player/${course.courseId}`)}
                      className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
                    >
                      {course.courseTitle}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[100px]">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${course.completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono">{course.completionPercentage}%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center text-sm font-medium">
                  {course.completedCount} / {course.totalLectures}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    course.completionPercentage === 100 ? 'bg-green-100 text-green-700' : 
                    course.completionPercentage > 0 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {course.completionPercentage === 100 ? 'Completed' : 
                     course.completionPercentage > 0 ? 'In Progress' : 'Not Started'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEnrollement;