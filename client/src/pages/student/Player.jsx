import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { dummyCourses } from "../../assets/assets/assets.js";
import Chat from '../../chatbot/Chat.jsx';

const Player = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const courseData = dummyCourses.find((elem) => elem.id === courseId);
  const [activeLecture, setActiveLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  useEffect(() => {
    if (courseData && courseData.courseContent.length > 0) {
      setActiveLecture(courseData.courseContent[0].chapterContent[0]);
    }
  }, [courseData]);

  if (!courseData) return <div className="p-10 text-center font-bold">Course Not Found</div>;

  const allLectures = courseData.courseContent.flatMap(c => c.chapterContent);
  const progressPercent = Math.round((completedLectures.length / allLectures.length) * 100);

  const toggleComplete = (id) => {
    setCompletedLectures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Toaster />
      
      {/* 1. HEADER */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b shrink-0">
        <div className="w-1/3">
           <div className="flex justify-between mb-1 text-[10px] font-bold text-blue-600 uppercase">
              <span>Progress</span>
              <span>{progressPercent}%</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
           </div>
        </div>
        <button 
          onClick={() => navigate(`/showPaste/${courseId}`)}
          className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all"
        >
          Take Notes
        </button>
      </div>

      {/* 2. MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Video Area (Independent Scroll) */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10"> 
          <div className="max-w-4xl mx-auto">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img src={courseData.courseThumbnail} className="w-full h-full object-cover opacity-60" alt="" />
            </div>

            {activeLecture && (
              <div className="mt-8">
                <h1 className="text-2xl font-black text-gray-900">{activeLecture.lectureTitle}</h1>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  Deep dive into {activeLecture.lectureTitle}. Make sure to complete the exercise after watching.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Independent Scroll) */}
        <div className="w-80 lg:w-96 border-l bg-gray-50 overflow-y-auto flex flex-col">
          
          {/* Syllabus Section (Takes only needed space) */}
          <div className="shrink-0 bg-white border-b">
            <div className="p-6">
              <h2 className="font-bold text-gray-800 tracking-tight">Course Content</h2>
            </div>
            
            {courseData.courseContent.map((chapter) => (
              <div key={chapter.chapterId} className="border-t">
                <div className="px-6 py-2 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b">
                  {chapter.chapterTitle}
                </div>
                {chapter.chapterContent.map((lecture) => (
                  <div
                    key={lecture.lectureId}
                    onClick={() => setActiveLecture(lecture)}
                    className={`flex items-center gap-4 px-6 py-4 border-b cursor-pointer transition-all ${
                      activeLecture?.lectureId === lecture.lectureId ? 'bg-blue-50/50 border-r-4 border-r-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <input type="checkbox" checked={completedLectures.includes(lecture.lectureId)} readOnly className="accent-blue-600" />
                    <p className={`text-xs font-bold ${activeLecture?.lectureId === lecture.lectureId ? 'text-blue-700' : 'text-gray-700'}`}>
                      {lecture.lectureTitle}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Chatbot Section (Sits nicely at the bottom) */}
          <div className="p-4 bg-gray-100 border-t mt-auto">
             <div className="bg-white rounded-lg shadow-inner overflow-hidden border border-gray-200">
                <Chat />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Player;