import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../component/student/SearchBar';
import CourseCard from '../../component/student/CourseCard';

const CourseList = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8087/all-courses`);
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 box-border">
      <div className="flex flex-col md:flex-row justify-between items-center my-6 md:my-10 gap-4 md:gap-6">
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold">Course List</h1>
          <p className="text-blue-600 cursor-pointer text-sm sm:text-base mt-1" onClick={() => navigate('/')}>Home / <span className="text-gray-500">CourseList</span></p>
        </div>
        <div className="w-full md:w-1/2 max-w-md"><SearchBar /></div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-8 md:pb-10">
        {loading ? (
          <p className="col-span-full text-center text-base sm:text-lg">Loading...</p>
        ) : (
          allCourses.map((elem) => (
            <div
              key={elem.course_id}
              onClick={() => navigate(`/course-list/${elem.course_id}`)}
              className="cursor-pointer transition-transform hover:scale-[1.03] focus:scale-[1.03] outline-none"
              tabIndex={0}
              aria-label={`View details for ${elem.course_title}`}
            >
              <CourseCard
                image={`http://localhost:8087/getImage?courseId=${elem.course_id}`}
                courseName={elem.course_title}
                rating={5}
                price={elem.course_price}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;