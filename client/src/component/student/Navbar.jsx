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
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);   
    // })
    }
  },[user, isSignedIn, isLoaded])


  return (
    <div className={`border border-b-gray-400 px-10   flex justify-between items-center h-16 ${isCourseList ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img onClick={()=>navigate("/")} src={logo} alt="logo" className='w-28 lg:w-32 cursor-pointer' />
      { !user && <>
        <button onClick={()=>openSignIn()} className="hidden lg:flex rounded-full text-white hover:bg-blue-700  bg-blue-600 px-5 py-2 cursor-pointer">Create Account</button>
        <FaUser onClick={()=>openSignIn()} className="lg:hidden " /></>
      }
      {user && !isEducator &&(<div className=' text-gray-600 flex flex-row items-center'>
        <Link to="/educator" className='hidden md:flex mx-1! hover:text-gray-700'>Become Educator</Link>
        <p className='md:flex mx-1! hidden'>|</p>
        <Link to="/my-enrollement" className='md:flex hidden mx-1! hover:text-gray-700'>My Enrollment</Link>
        <UserButton/>
      </div>)}
      {
        isEducator && <button>Hi {user?.fullName}</button>
      }
    </div>
  )
}

export default Navbar

