import React from 'react' 
import { useState,useEffect } from 'react'
import './index.css';
import { Routes,Route, useMatch } from 'react-router-dom';
import Home from './pages/student/Home.jsx'
import CourseList from './pages/student/CourseList.jsx'
import CourseDetail from './pages/student/CourseDetail.jsx'
import MyEnrollement from './pages/student/MyEnrollement.jsx'
import Player from './pages/student/Player.jsx'
import Loading from './component/student/Loading.jsx'
import Educator from './pages/educator/Educator.jsx'
import Dashboard from './pages/educator/Dashboard.jsx'
import AddCourse from './pages/educator/AddCourse.jsx';
import Mycourses from './pages/educator/Mycourses.jsx';
import StudentEnrolled from './pages/educator/StudentEnrolled.jsx';
import Navbar from './component/student/Navbar.jsx';
import Paste from './pastes/Paste.jsx';
import EnrollToCourse from './pages/student/EnrollToCourse.jsx'
import { SignUp } from '@clerk/clerk-react';
 

function App() {
  let isEducatorRoute = useMatch('/educator/*')
  // let userDetails = useState({
  //   userEmail:""
  // })

    return(
      <>
        {!isEducatorRoute && <Navbar  />}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-up" element={<SignUp/>} /> 
          <Route path="/course-list" element={<CourseList/>}/>
          <Route path="/course-list/:courseId" element={<CourseDetail/>}/>
          <Route  path="/course-list/:courseId/enroll-to-course" element={<EnrollToCourse/>}/>
          <Route path="/my-enrollement" element={<MyEnrollement/>}/>
          <Route path="/player/:courseId" element={<Player/>}/>
          <Route path="/loading/:path" element={<Loading/>}/>
          <Route path="/educator" element={<Educator/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-courses' element={<Mycourses/>}/>
            <Route path='student-enrolled' element={<StudentEnrolled/>}/>
          </Route>
          <Route path="/showPaste/:courseId" element={<Paste/>}></Route>
        </Routes>  
      </>
    )
}
export default App
