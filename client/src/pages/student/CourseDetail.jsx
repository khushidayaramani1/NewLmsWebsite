import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseDropdown from "../../component/student/CourseDropdown.jsx";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();
  const [myCourse, setMyCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fixes the 404 Error by using your working all-courses endpoint
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8087/all-courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        // Find the specific course in the list
        const foundCourse = data.find((elem) => elem.course_id == courseId);
        if (foundCourse) {
          setMyCourse(foundCourse);
        } else {
          toast.error("Course not found");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courseId]);

  const handleEnrollClick = async () => {
    if (!isSignedIn) {
      toast.error("Please login to enroll");
      navigate("/sign-up");
      return;
    }

    try {
      const email = user.primaryEmailAddress.emailAddress;
      // Fixes the 400 Error by matching the @RequestParam names in Java
      const res = await fetch(
        `http://localhost:8087/is-enrolled?courseId=${courseId}&email=${email}`
      );
      
      const isAlreadyEnrolled = await res.json(); 

      if (isAlreadyEnrolled) {
        toast.success("You are already enrolled!");
        navigate(`/my-enrollement`);
      } else {
        navigate(`/course-list/${courseId}/enroll-to-course`);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading || !isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-lg md:text-2xl p-4">
        Loading...
      </div>
    );
  if (!myCourse)
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        Course not found.
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left: Course Details */}
      <div className="w-full md:w-1/2 px-4 py-8 md:p-10 space-y-8 md:space-y-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{myCourse.course_title}</h1>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mt-2 break-words">{myCourse.course_headings}</h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg break-words">{myCourse.course_description}</p>
        </div>
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Course Structure</h2>
          <CourseDropdown courseContent={myCourse.course_content ? JSON.parse(myCourse.course_content) : []} />
        </div>
      </div>

      {/* Right: Enrollment Card */}
      <div className="w-full md:w-1/2 px-4 py-8 md:p-10 flex flex-col items-center">
        <div className="bg-white border rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md md:sticky md:top-10">
          <img
            className="w-full h-40 sm:h-56 object-cover rounded-lg mb-4"
            src={`http://localhost:8087/getImage?courseId=${myCourse.course_id}`}
            alt="course"
          />
          <p className="text-3xl sm:text-4xl font-extrabold text-center my-4 sm:my-6">₹{myCourse.course_price}</p>
          <button
            onClick={handleEnrollClick}
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-700 transition-all text-base sm:text-lg"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;