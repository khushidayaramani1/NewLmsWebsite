import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard.jsx';

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await fetch('http://localhost:8087/get-four-courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        const fetchedData = Array.isArray(data) ? data : data.courses;
        setCourses(fetchedData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopCourses();
  }, []);

  return (
    <div className='flex flex-col gap-y-8! max-w-9xl mx-auto px-6 py-16 md:py-24'>
      
      {/* Header */}
      <div className='text-center md:text-left mb-12'>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Learn from the best
        </h2>
        <p className="text-slate-500 text-lg max-w-xl">
          Discover top-rated courses across various categories crafted to deliver real-world results.
        </p>
      </div>

      <div className=''> 
        {/* Loading */}
        {loading ? (
          <div className="text-center text-slate-500 text-lg">
            Loading courses...
          </div>
        ) : (
          
          <div className="flex  md:gap-8   w-full overflow-x-auto py-4">
            {courses.map((elem) => (
              <div key={elem.course_id} className="w-full">
                <CourseCard  
                  image={`http://localhost:8087/getImage?courseId=${elem.course_id}`} 
                  courseName={elem.course_title} 
                  price={elem.course_price}
                  rating={elem.course_rating || "4.5"} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* See All Button */}
      <div className='mt-16 md:mt-24 flex justify-center items-center'>
        <Link 
          to="/course-list" 
          onClick={() => window.scrollTo(0, 0)}
          className="group px-10 md:px-14 py-4 md:py-5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200/50 flex items-center gap-2 active:scale-95"
        >
          See All Courses
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;