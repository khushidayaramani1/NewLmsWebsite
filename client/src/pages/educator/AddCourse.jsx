import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {useUser} from '@clerk/clerk-react';

const AddCourse = () => {

    const {register,handleSubmit,formState:{errors}} = useForm();

    const formData = new FormData();

    const {user} = useUser();

    function onSubmit(data){
        console.log("form data",data)
        const formData = new FormData();
        formData.append("imageFile",data.thumbnailName[0]);
    
        const courseInfo = {
            courseTitle: data.courseTitle,
            courseHeadings: data.courseHeadings,
            courseDescription: data.courseDescription,
            coursePrice: data.coursePrice,
            educatorId: user.id
        };

        const jsonBlob = new Blob([JSON.stringify(courseInfo)], { type: 'application/json' });
        formData.append("cd", jsonBlob);

        fetch('http://localhost:8087/add-course-detail',{
            method:'POST',
            body: formData
        })
        .then((response)=>{
            if(response.ok){
                console.log("course added successfully")
                console.log(courseInfo)
            }
            else{
                console.log("error in adding course")
            }
        })
        // .catch(error => console.error("Network error:", error));
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2! w-max text-lg text-gray-600'>
            <div className='flex gap-3'>
                <label htmlFor="" className='w-25'>Course Title</label>
                <input type="text" className='border border-gray-600 rounded-md w-70' {...register("courseTitle")}  />
            </div>
            <div className='flex gap-3'>
                <label htmlFor="" className='w-25'>Course Headings</label>
                <input type="text" className='border border-gray-600 rounded-md w-70 ' {...register("courseHeadings")}  />
            </div>
            <div className='flex gap-3'>
                <label htmlFor="" className='w-25'>Course Description</label>
                <textarea rows="2" type="text" className='border border-gray-600 rounded-md w-70 ' {...register("courseDescription")}  />
            </div>
            <div className='flex gap-4!'> 
                <div className='flex gap-3'>
                    <label htmlFor="" className='w-25'>Course Price</label>
                    <input type="text" className='border border-gray-600 rounded-md w-70 ' {...register("coursePrice")}  />
                </div>
                <div className='flex '>
                    <label htmlFor="" className='w-25'>Course Thumbnail</label>
                    <input type="file" className='border border-gray-600 rounded-md   w-70' {...register("thumbnailName")} />
                </div>
            </div>
            <button className='mt-10! self-center bg-gray-900 text-white font-semibold w-max p-1! rounded-md '>ADD</button>
        </form>
    </>
  )
}

export default AddCourse
