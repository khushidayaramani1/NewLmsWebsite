import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../component/student/SearchBar'
import CourseCard from '../../component/student/CourseCard'
import { dummyCourses as dummyCourse } from "../../assets/assets/assets.js";

const CourseList = () => {
  const navigate = useNavigate();

  function openDetailedPage(id) {
    console.log("click hua "+id)
    navigate(`/course-list/${id}`);
  }

  return (
    <>
      <div className="flex justify-evenly w-full items-center my-10">
        <div className="w-1/4">
          <div className="text-4xl font-semibold text-gray-800">
            Course List
          </div>
          <div
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Home <span className="text-gray-500">/ CourseList</span>
          </div>
        </div>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {dummyCourse.map((elem) => (
          <button key={elem.id} type='button' onClick={() => openDetailedPage(elem.id)} className='cursor-pointer' > 
          <CourseCard
            image={elem.courseThumbnail}
            courseName={elem.courseTitle}
            rating={elem.courseRatings.rating}
            price={elem.coursePrice}
          />
          </button>
        ))}
      </div>
    </>
  );
};

export default CourseList;
