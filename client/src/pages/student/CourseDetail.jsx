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

  if (loading || !isLoaded) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!myCourse) return <div className="h-screen flex items-center justify-center">Course not found.</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{myCourse.course_title}</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">{myCourse.course_headings}</h2>
          <p className="text-gray-600 mt-4">{myCourse.course_description}</p>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-5">Course Structure</h2>
          <CourseDropdown courseContent={myCourse.course_content ? JSON.parse(myCourse.course_content) : []} />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-10 bg-gray-50 flex flex-col items-center">
        <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md sticky top-10">
          <img className="w-full h-56 object-cover rounded-lg" src={`http://localhost:8087/getImage?courseId=${myCourse.course_id}`} alt="course" />
          <p className="text-4xl font-extrabold text-center my-6">₹{myCourse.course_price}</p>
          <button onClick={handleEnrollClick} className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;