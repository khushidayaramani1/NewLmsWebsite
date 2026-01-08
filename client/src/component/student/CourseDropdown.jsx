import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import dropdown from '../../assets/assets/down_arrow_icon.svg'
import play from '../../assets/assets/play_icon.svg'
import { dummyCourses as dummyCourse } from "../../assets/assets/assets.js";

const CourseDropdown = (props) => {

  const { courseId } = useParams()
  const course = props.courseContent

  // safety check
  if (!course) return <p>Course not found</p>

  // state to track open chapters
  const [openSection, setOpenSection] = useState({})

  function toggleSection(index) {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <div className="bg-gray-50 p-3 border w-1/3 space-y-4">

      {course.map((chapter, index) => {

        const lectures = chapter.chapterContent
        const noOfLecs = lectures.length

        let totDuration = 0
        lectures.forEach((lec) => {
          totDuration += lec.lectureDuration
        })

        return (
          <div key={index}>

            {/* Chapter Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <div className="flex items-center gap-2">
                <img
                  className={`h-3 w-3 transition-transform duration-300 
                  ${openSection[index] ? 'rotate-180' : ''}`}
                  src={dropdown}
                  alt="dropdown"
                />
                <p className="font-medium">
                  {chapter.chapterTitle}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <p>{noOfLecs} lectures</p>
                <p>-</p>
                <p>{totDuration} min</p>
              </div>
            </div>

            {/* Lectures List */}
            <div
              className={`overflow-hidden transition-all duration-300 ml-5 mt-2 space-y-1
              ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}
            >
              {lectures.map((lec) => (
                <div
                  key={lec.lectureId}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <img src={play} className="h-3 w-3" alt="play" />
                  <p>
                    {lec.lectureTitle} ({lec.lectureDuration} min)
                  </p>
                </div>
              ))}
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default CourseDropdown
