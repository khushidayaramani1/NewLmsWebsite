import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Chat from '../../chatbot/Chat.jsx';

const Player = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const [courseData, setCourseData] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);

  // --- MAIN DATA FETCHING LOGIC ---
  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        // ---------------------------------------------------------
        // FIX 1: Changed endpoint from 'get-chapterId' to 'get-chapters'
        // This ensures we get Objects { chapter_id: 1, chapter_title: "..." }
        // instead of just integers [1, 2].
        // ---------------------------------------------------------
        const chapterRes = await fetch(`http://localhost:8087/get-chapters/${courseId}`);
        
        if (!chapterRes.ok) throw new Error("Failed to fetch chapters");
        const chaptersData = await chapterRes.json();
        
        console.log("Chapter Metadata:", chaptersData);

        // 2. Fetch Lectures for ALL chapters in parallel
        const fullChaptersData = await Promise.all(
          chaptersData.map(async (chapter) => {
            // FIX 2: Ensure we access the correct key. 
            // Since Map<String,Object> usually returns DB column names, handle both cases.
            const id = chapter.chapter_id || chapter.id; 

            // specific check to prevent fetching 'undefined'
            if (!id) {
                console.warn("Skipping chapter with no ID:", chapter);
                return { ...chapter, lectures: [] };
            }

            try {
              const lectureRes = await fetch(`http://localhost:8087/get-lecture-by-chapterId/${id}`);
              
              if(!lectureRes.ok) {
                  return { ...chapter, lectures: [] };
              }

              const lectures = await lectureRes.json();
              // Merge lectures into chapter object
              return { ...chapter, lectures: Array.isArray(lectures) ? lectures : [] }; 
            } catch (err) {
              console.error(`Error fetching lectures for chapter ${id}`, err);
              return { ...chapter, lectures: [] };
            }
          })
        );

        console.log("Final Merged Data:", fullChaptersData);
        setChapters(fullChaptersData);

        // 3. Auto-play first lecture if not set
        if (fullChaptersData.length > 0 && fullChaptersData[0].lectures?.length > 0 && !activeLecture) {
          setActiveLecture(fullChaptersData[0].lectures[0]);
        }

      } catch (err) {
        console.error("Master Fetch Error:", err);
        toast.error("Failed to load course content");
      }
    };

    if(courseId) {
        fetchCourseContent();
    }
  }, [courseId]);

  // Fetch Course Metadata (Thumbnail, etc.)
  useEffect(() => {
    if(!courseId) return;

    setLoading(true);
    fetch(`http://localhost:8087/get-by-id/${courseId}`)
      .then(async res => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setCourseData(data);
        } catch (err) {
          console.error("Non-JSON response for course data:", text);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error("Fetch error:", err);
      });
  }, [courseId]);

  // --- PROGRESS CALCULATIONS ---
  const allLectures = chapters?.flatMap(c => c.lectures ?? []) ?? [];
  const totalLectures = allLectures.length;
  const completedCount = completedLectures.length;
  const progressPercent = totalLectures > 0 
    ? Math.round((completedCount / totalLectures) * 100) 
    : 0;

  const toggleComplete = (id) => {
    setCompletedLectures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="p-10 text-center font-bold animate-pulse text-blue-600">Loading Course Environment...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toaster />
      
      {/* 1. HEADER WITH GLOBAL PROGRESS */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b shrink-0 shadow-sm z-10">
        <div className="w-1/3">
           <div className="flex justify-between mb-1 text-[11px] font-black text-blue-600 uppercase tracking-wider">
             <span>Course Completion</span>
             <span>{progressPercent}%</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-2">
             <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                style={{ width: `${progressPercent}%` }}
             ></div>
           </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400">{completedCount} / {totalLectures} Lessons</span>
            <button 
                onClick={() => navigate(`/showPaste/${courseId}`)} 
                className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all transform active:scale-95 shadow-md"
            >
            Take Notes
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Video + Chapters List */}
        <div className="flex-1 overflow-y-auto bg-white scroll-smooth"> 
          
          {/* Video Player Section */}
          <div className="p-6 lg:p-10 bg-gray-900 shadow-inner">
            <div className="max-w-5xl mx-auto">
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative border border-gray-800">
                <img src={courseData?.courseThumbnail} className="w-full h-full object-cover opacity-40 blur-[2px]" alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="bg-white/10 p-6 rounded-full backdrop-blur-md mb-4 border border-white/20">
                        <div className="w-12 h-12 border-4 border-t-blue-500 border-white/20 rounded-full animate-spin"></div>
                   </div>
                   <p className="text-white font-bold text-xl">{activeLecture?.lectureTitle || "Select a Lesson"}</p>
                   <p className="text-blue-400 text-sm mt-2 font-medium tracking-wide">READY TO STREAM</p>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTERS SECTION */}
          <div className="max-w-5xl mx-auto p-6 lg:p-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Course Chapters</h2>
                    <p className="text-gray-500 text-sm mt-1">Select a lecture to start learning</p>
                </div>
                <div className="hidden md:block bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                    <span className="text-xs font-bold text-gray-600">Total Duration: {allLectures.reduce((acc, curr) => acc + parseInt(curr.lectureDuration || 0), 0)} mins</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {chapters.map((chapter, index) => {
                const chapterLecs = chapter.lectures || [];
                const completedInChapter = chapterLecs.filter(l => completedLectures.includes(l.lectureId)).length;
                const chapterPercent = chapterLecs.length > 0 ? (completedInChapter / chapterLecs.length) * 100 : 0;

                return (
                  <div key={chapter.chapter_id || chapter.chapterId || `chapter-${index}`} className="group">
                    <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm group-hover:border-blue-100 transition-all duration-300">
                      
                      {/* Chapter Header Box */}
                      <div className="px-8 py-6 bg-gray-50/50 border-b flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-900 text-white text-sm font-black shadow-lg">
                                {index + 1}
                            </span>
                            <div>
                                <h3 className="font-black text-gray-800 text-lg leading-tight uppercase tracking-tight">
                                    {/* Handle DB naming conventions */}
                                    {chapter.chapter_tilte || chapter.chapter_title || "Chapter " + (index+1)}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">
                                        {chapterLecs.length} Lessons
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400">{completedInChapter} / {chapterLecs.length} Done</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Chapter Progress Mini-Bar */}
                        <div className="w-32">
                             <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-green-500 h-full transition-all duration-1000" 
                                    style={{ width: `${chapterPercent}%` }}
                                />
                             </div>
                        </div>
                      </div>

                      {/* Lectures List */}
                      <div className="divide-y divide-gray-50 bg-white">
                        {chapterLecs.length > 0 ? (
                           chapterLecs.map((lecture, lecIdx) => (
                              <div
                                key={lecture.lectureId || `lecture-${index}-${lecIdx}`}
                                onClick={() => {
                                  setActiveLecture(lecture);
                                  document.querySelector('.bg-gray-900').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`flex items-center gap-4 px-8 py-5 cursor-pointer transition-colors ${
                                  activeLecture?.lectureId === lecture.lectureId 
                                    ? 'bg-blue-50/70 border-l-4 border-l-blue-600' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                <input 
                                  type="checkbox" 
                                  checked={completedLectures.includes(lecture.lectureId)} 
                                  onChange={() => toggleComplete(lecture.lectureId)}
                                  onClick={(e) => e.stopPropagation()} 
                                  className="accent-blue-600 h-4 w-4 rounded cursor-pointer" 
                                />
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${activeLecture?.lectureId === lecture.lectureId ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {lecture.lectureTitle}
                                  </p>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                    {lecture.lectureDuration}m
                                </span>
                              </div>
                            ))
                        ) : (
                          <div className="px-8 py-5 text-gray-400 text-sm">No lectures in this chapter.</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Chat Sidebar */}
        <div className="w-80 lg:w-96 border-l bg-gray-50 flex flex-col shrink-0 shadow-2xl">
          <div className="p-6 bg-white border-b flex items-center justify-between">
            <h3 className="font-black text-gray-800 uppercase tracking-tighter text-sm">AI Tutor Assistant</h3>
            <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </div>
          <div className="flex-1 p-4 bg-gray-50">
             <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <Chat />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;