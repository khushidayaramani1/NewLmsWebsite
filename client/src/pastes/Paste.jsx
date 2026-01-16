import React from 'react'
import { useState,useEffect } from 'react'
import { FaRegCopy } from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { FaFilePdf } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';


const Paste = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef
    });
    
    let [pasteArray, setAllPastes] = useState([]);
    const {courseId} = useParams()

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let [obj,setObj]=useState({
        title:"",
        content:""
    })

    function handleChange(e){
        setObj({...obj,[e.target.name]:e.target.value})
    }

    // handle copy is for the text to copy
    function handleCopy(){
        if (obj.content) {
            navigator.clipboard.writeText(obj.content);
            toast.success('Copied to clipboard! ✅');
        } else {
            toast.error("Nothing to copy!");
        }
    }
     
    function handleCreatePaste(){
        const now = new Date().toLocaleString();
        const newPaste={
            title: obj.title,
            content: obj.content,
            date: now.split(",")[0],
            time: now.split(",")[1]
        }
        setAllPastes([...pasteArray, newPaste]);
        console.log(pasteArray);
        if(courseId){
            toast.success("Paste updated successfully!");
        }else{
            toast.success("Paste created successfully!");
        }
         
        // post to put the data into the tables
        fetch('http://localhost:8087/pasteData',{
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPaste)
        }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
    }

    // getting all data like all the paste
    useEffect(()=>{
        const fetchPastes = () => {
        fetch('http://localhost:8087/pasteData')
        .then((response) => response.json())
        .then((data) => {
            setAllPastes(data);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        };
        console.log(fetchPastes)
    },[])
     

  return (
    <>
        <div className='h-screen   flex justify-center '>
            <div ref={componentRef} className='flex flex-col space-y-6!   my-10!  w-1/2  '>
                <Toaster position="top-right" />
                <div className=' flex items-center h-10 space-x-2!'  > 
                    <input  name='title' onChange={handleChange} type="text" className='px-4! h-full text-gray-800 bg-gray-200 w-full rounded-lg' placeholder='Title'   />
                    <FaFilePdf className='cursor-pointer' onClick={handlePrint}  size={50} />
                    <button onClick={handleCreatePaste} className='w-40 h-full rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-300 hover:text-gray-600 hover:cursor-pointer'>Create My Paste</button>
                </div>
                <div className='relative w-full'  >
                    <textarea  name='content' rows={20} onChange={handleChange} className='p-4 text-black bg-gray-200 w-full rounded-lg outline-none' placeholder='Write your content here...' />
                    {/* Icon is pinned to the top right with absolute */}
                    <FaRegCopy onClick={handleCopy} size={22} className='absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black transition-colors' />
                </div>
                {
                    pasteArray.map((elem,index)=>{
                        return(
                            <button onClick={() => navigate(`/paste?pasteId=${index+1}`)} key={index+1} className='border p-4 rounded-lg space-y-2'>
                                <div className='flex justify-between items-center px-1!'>
                                    <h2 className='text-xl font-semibold'>{elem.title}</h2>
                                    <h4 className='text-xl font-semibold'>Created on: {elem.date} at {elem.time}</h4>
                                </div>
                                <p className='whitespace-pre-wrap bg-gray-100 p-4 rounded-lg'>{elem.content}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    </>
  ) 
}

export default Paste
