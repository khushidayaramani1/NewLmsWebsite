import React from 'react'
import logo from "../../assets/assets/logo.svg";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate  } from 'react-router-dom';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import {useEffect,useState} from 'react';

// when u login that time the user detail will store in db

const Navbar = () => {
  let isCourseList = location.pathname.includes('/course-list')
  let isEducator=location.pathname.includes('/educator')
  const navigate = useNavigate()
  const {openSignIn} =useClerk()
  const {user, isSignedIn, isLoaded} = useUser()
  
  useEffect(()=>{
    if (isLoaded && isSignedIn){
      const userData = {
        clerkId: user.id,
        userName: user.fullName,
        email: user.primaryEmailAddress?.emailAddress
      };
    console.log("user in nav",userData)
    fetch('http://localhost:8087/addUser',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(userData),
    })
    }
  },[user, isSignedIn, isLoaded])

  function handleEducator(){
    if (isLoaded && isSignedIn){
      fetch(' http://localhost:8087/set-isEducator?clerkId='+user.id)
      console.log("logged in as Educator"+user.fullName);
    }
  }


  return (
    <div className={`border-b px-4 sm:px-6 md:px-10 flex justify-between items-center h-14 sm:h-16 ${isCourseList ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={()=>navigate("/")} src={logo} alt="logo" className='w-20 sm:w-24 md:w-28 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' />
      { !user && <>
        <button onClick={()=>openSignIn()} className="hidden md:flex rounded-full text-white hover:bg-blue-700 bg-blue-600 px-4 sm:px-5 py-2 cursor-pointer text-sm font-medium transition-colors">Create Account</button>
        <FaUser onClick={()=>openSignIn()} className="md:hidden text-gray-600 cursor-pointer hover:text-blue-600" size={18} /></>
      }
      {user && !isEducator &&(<div className='text-gray-600 flex flex-row items-center gap-2 sm:gap-4'>
        <Link to="/educator" onClick={handleEducator} className='hidden md:flex text-sm hover:text-blue-600 transition-colors'>Become Educator</Link>
        <p className='hidden md:flex'>|</p>
        <Link to="/my-enrollement" className='hidden md:flex text-sm hover:text-blue-600 transition-colors'>My Enrollment</Link>
        <UserButton/>
      </div>)}
      {
        isEducator && <button className='text-sm sm:text-base font-medium text-gray-700'>Hi {user?.fullName?.split(' ')[0]}</button>
      }
    </div>
  )
}

export default Navbar

