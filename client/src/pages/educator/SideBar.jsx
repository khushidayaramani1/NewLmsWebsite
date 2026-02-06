import React from 'react'
import { Link } from 'react-router-dom' 
import home_icon from '../../assets/assets/home_icon.svg'
import add_icon from '../../assets/assets/add_icon.svg'
import my_course_icon from '../../assets/assets/my_course_icon.svg'
import person_tick_icon from '../../assets/assets/person_tick_icon.svg'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
  const menuItems = [
    { name: 'Add Course', path: '/educator/add-course', icon: add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: person_tick_icon },
  ]

  return (
    <>
      <div className="w-64 h-screen  flex flex-col text-gray-700  px-10! justify-start  border-l-gray-600 p-4">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="flex items-center gap-3 mb-4! text-lg">
            <img src={item.icon} alt={item.name} className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div>

      </div>
    </>
  )
}

export default SideBar
