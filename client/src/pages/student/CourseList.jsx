import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../component/student/SearchBar';
import CourseCard from '../../component/student/CourseCard';

const CourseList = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const openDetailedPage = (id) => {
    navigate(`/course-list/${id}`);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8087/all-courses`, {
          signal: controller.signal
        });
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        if (error.name !== 'AbortError') console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 box-border">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 my-10">
        <div className="shrink-0"> {/* Prevents title from squishing */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Course List
          </h1>
          <div
            className="text-blue-600 cursor-pointer text-sm md:text-base"
            onClick={() => navigate('/')}
          >
            Home <span className="text-gray-500">/ CourseList</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5">
          <SearchBar />
        </div>
      </div>

      {/* Uniform Grid - Fixed Overlapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">Loading courses...</div>
        ) : (
          allCourses.map((elem) => (
            <button 
              key={elem.course_id} 
              type='button' 
              onClick={() => openDetailedPage(elem.course_id)} 
              /* overflow-hidden: stops internal content from bleeding out
                max-w-full: ensures the button never exceeds the grid cell width
              */
              className='group flex flex-col w-full overflow-hidden text-left bg-white rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none'
            > 
              <div className="w-full h-full">
                <CourseCard
                  image={`http://localhost:8087/getImage?courseId=${elem.course_id}`}
                  courseName={elem.course_title}
                  rating={5}
                  price={elem.course_price}
                />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;