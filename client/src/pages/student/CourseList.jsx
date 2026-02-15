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
    <div className="w-full px-4 md:px-12 box-border">
      <div className="flex flex-col md:flex-row justify-between items-center my-10 gap-6">
        <div>
          <h1 className="text-3xl font-semibold">Course List</h1>
          <p className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home / <span className="text-gray-500">CourseList</span></p>
        </div>
        <div className="w-full md:w-1/2"><SearchBar /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : (
          allCourses.map((elem) => (
            <div key={elem.course_id} onClick={() => navigate(`/course-list/${elem.course_id}`)} className="cursor-pointer">
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