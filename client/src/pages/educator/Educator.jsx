import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../component/student/Navbar.jsx'
import SideBar from '../../component/educator/SideBar.jsx'

const Educator = () => {
  return (
    <>
      <Navbar />

      <div className="flex gap-10 mt-10 px-6">
        <SideBar />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Educator
