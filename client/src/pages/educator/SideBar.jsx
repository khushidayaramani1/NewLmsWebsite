import React from 'react'
import { Link } from 'react-router-dom' 
import home_icon from '../../assets/assets/home_icon.svg'
import add_icon from '../../assets/assets/add_icon.svg'
import my_course_icon from '../../assets/assets/my_course_icon.svg'
import person_tick_icon from '../../assets/assets/person_tick_icon.svg'

const SideBar = () => {
  const menuItems = [
    { name: 'Add Course', path: '/educator/add-course', icon: add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: person_tick_icon },
  ]

  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-start px-4 sm:px-6 md:px-8 py-3 sm:py-4 gap-2 sm:gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap font-medium text-xs sm:text-sm md:text-base active:bg-blue-100"
          >
            <img src={item.icon} alt={item.name} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default SideBar
