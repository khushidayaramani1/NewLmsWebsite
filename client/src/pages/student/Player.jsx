import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { dummyCourses } from "../../assets/assets/assets.js";
import { Navigate } from 'react-router-dom';
 

const Player = () => {

  const navigate = useNavigate();
  const {courseId} = useParams();

  
  // 1. Find the specific course using the ID from the URL
  const courseData = dummyCourses.find((elem) => elem.id === courseId );

  // 2. States for active lecture and progress tracking
  const [activeLecture, setActiveLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  // 3. Effect to set the initial lecture once data is found
  useEffect(() => {
    if (courseData && courseData.courseContent.length > 0) {
      setActiveLecture(courseData.courseContent[0].chapterContent[0]);
    }
  }, [courseData]);

  // 4. Handle Case: Course ID not found in assets
  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-red-500">Course Not Found</h1>
        <p className="text-gray-600 mt-2">The ID "{courseId}" does not match any enrolled courses.</p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // 5. Progress Logic
  const allLectures = courseData.courseContent.flatMap(c => c.chapterContent);
  const totalLecturesCount = allLectures.length;
  const progressPercent = Math.round((completedLectures.length / totalLecturesCount) * 100);

  const toggleComplete = (id) => {
    setCompletedLectures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    if (!completedLectures.includes(id)) {
      toast.success("Progress Updated!", { icon: '✅' });
    }
  };

  function showPaste(){
    console.log(courseId)
    navigate(`/showPaste/${courseId}`)
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      <Toaster />

      {/* LEFT: CONTENT & VIDEO AREA */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className='flex  '> 
            <div className="mb-6 bg-blue-50 p-5 rounded-2xl border border-blue-100 w-3/4 ">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-800">Your Course Progress</span>
                <span className="text-sm font-bold text-blue-800">{progressPercent}% Completed</span>
              </div>
              
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-in-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <button onClick={showPaste} className="hover:bg-blue-100 cursor-pointer text-md font-bold text-blue-800 mb-6 bg-blue-50 p-5 rounded-2xl border border-blue-100 w-1/6 ml-20! " >Take Notes</button>
          </div>
          {/* Player (Small Frame) */}
          <div className="relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group">
            <img 
              src={courseData.courseThumbnail} 
              alt="Thumbnail" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl ml-1">▶</span>
              </button>
            </div>
          </div>

          {/* Lecture Description Area */}
          {activeLecture && (
            <div className="mt-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900">{activeLecture.lectureTitle}</h1>
                  <p className="text-gray-500 mt-1">Duration: {activeLecture.lectureDuration} minutes</p>
                </div>
                <button 
                   onClick={() => toggleComplete(activeLecture.lectureId)}
                   className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                     completedLectures.includes(activeLecture.lectureId) 
                     ? 'bg-green-100 text-green-700' 
                     : 'bg-blue-600 text-white hover:bg-blue-700'
                   }`}
                >
                  {completedLectures.includes(activeLecture.lectureId) ? '✓ Completed' : 'Mark as Complete'}
                </button>
              </div>

              <div className="mt-6 prose max-w-none text-gray-600">
                <h3 className="text-lg font-bold text-gray-800">About this lecture</h3>
                <p className="mt-2 leading-relaxed">
                  In this lesson of <strong>{courseData.courseTitle}</strong>, we cover 
                  important concepts regarding {activeLecture.lectureTitle}. Make sure to 
                  practice the examples shown in the video.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: PLAYLIST SIDEBAR */}
      <div className="w-full lg:w-96 border-l bg-gray-50 flex flex-col shadow-xl">
        <div className="p-6 bg-white border-b">
          <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{totalLecturesCount} Total Lectures</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {courseData.courseContent.map((chapter) => (
            <div key={chapter.chapterId}>
              {/* Chapter Title Block */}
              <div className="px-6 py-3 bg-gray-200/50 border-y text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                {chapter.chapterTitle}
              </div>

              {/* Lecture List */}
              {chapter.chapterContent.map((lecture) => (
                <div
                  key={lecture.lectureId}
                  className={`flex items-center gap-3 px-6 py-4 border-b cursor-pointer transition-all ${
                    activeLecture?.lectureId === lecture.lectureId 
                    ? 'bg-blue-50 border-r-4 border-r-blue-600' 
                    : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveLecture(lecture)}
                >
                  {/* Progress Checkbox */}
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={completedLectures.includes(lecture.lectureId)}
                      onChange={() => toggleComplete(lecture.lectureId)}
                      onClick={(e) => e.stopPropagation()} 
                      className="w-5 h-5 rounded-md border-gray-300 accent-green-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-tight ${
                      activeLecture?.lectureId === lecture.lectureId ? 'text-blue-700' : 'text-gray-800'
                    }`}>
                      {lecture.lectureTitle}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{lecture.lectureDuration} min</p>
                  </div>
                  
                  {activeLecture?.lectureId === lecture.lectureId && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;