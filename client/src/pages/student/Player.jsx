import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Chat from '../../chatbot/Chat.jsx';
import Curriculum from '../../component/student/Curriculum.jsx';

const Player = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load course metadata and completed lectures from localStorage
  useEffect(() => {
    let isMounted = true;

    const fetchCourseData = async () => {
      if (!courseId) return;
      setLoading(true);

      try {
        // Load previously completed lectures from localStorage
        const stored = localStorage.getItem(`course-${courseId}-completed`);
        if (isMounted) setCompletedLectures(stored ? JSON.parse(stored) : []);

        // Fetch course metadata (title, thumbnail, etc.)
        const metaRes = await fetch(`http://localhost:8087/get-by-id/${courseId}`);
        if (!metaRes.ok) throw new Error('Failed to fetch course data');
        const metaData = await metaRes.json();
        if (isMounted) setCourseData(metaData);
      } catch (err) {
        console.error("Course Data Fetch Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourseData();
    return () => { isMounted = false; };
  }, [courseId]);

  console.log("Course Data:", courseData);

  // Handle Progress Checkboxes
  const toggleComplete = (e, id) => {
    e.stopPropagation();
    setCompletedLectures(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem(`course-${courseId}-completed`, JSON.stringify(updated));
      return updated;
    });
  };

  // Reset Feature
  const resetProgress = () => {
    if (window.confirm("Delete all progress for this course?")) {
      localStorage.removeItem(`course-${courseId}-completed`);
      setCompletedLectures([]);
      toast.success("Progress cleared");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">Loading Course...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toaster />
      <header className="px-4 sm:px-6 py-3 sm:py-4 bg-white border-b flex justify-between items-center shrink-0 shadow-sm gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <h1 className="font-bold text-sm sm:text-base text-gray-800 uppercase tracking-tight cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate('/my-enrollments')}>← Player</h1>
          <button onClick={resetProgress} className="text-[8px] sm:text-[10px] text-red-500 hover:bg-red-50 border border-red-200 px-2 py-1 rounded font-bold uppercase transition-colors">Reset</button>
        </div>
        <button onClick={() => navigate(`/showPaste/${courseId}`)} className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">Take Notes</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white scroll-smooth">
          <div className="p-4 bg-gray-900 flex justify-center">
            <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
  
              {/* 🔥 If lecture selected → show video */}
              {activeLecture ? (
                activeLecture.videoUrl ? (
                  <video
                    key={activeLecture.id}
                    controls
                    autoPlay
                    className="w-full h-full"
                  >
                    <source src={activeLecture.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-center p-4">
                    <div>
                      <p className="font-bold text-lg mb-2">Video not available</p>
                      <p className="text-sm text-gray-400">Selected lecture: {activeLecture.title}</p>
                    </div>
                  </div>
                )
              ) : (
                /* 🖼 If no lecture selected → show thumbnail */
                <img
                  src={`http://localhost:8087/getImage?courseId=${courseId}`}
                  alt="Course Thumbnail"
                  className="w-full h-full object-cover"
                />
              )}

            </div>
          </div>

          <Curriculum 
            courseId={courseId}
            activeLecture={activeLecture}
            setActiveLecture={setActiveLecture}
            completedLectures={completedLectures}
            toggleComplete={toggleComplete}
          />

        </div>

        <div className="w-80 xl:w-96 border-l bg-gray-50 p-4 shrink-0 hidden lg:block">
           <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><Chat /></div>
        </div>

      </div>
    </div>
  );
};

export default Player;