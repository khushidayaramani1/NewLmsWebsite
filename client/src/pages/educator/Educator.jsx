import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Educator = () => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <SideBar />

      {/* Right content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  )
}

export default Educator
