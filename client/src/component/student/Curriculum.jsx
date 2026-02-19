import React, { useState, useEffect } from 'react';

const Curriculum = ({ courseId, activeLecture, setActiveLecture, completedLectures, toggleComplete }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 🎓 FETCH & SORT CHAPTERS */
  useEffect(() => {
    if (!courseId) return;

    const fetchChapters = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch chapters from API
        const chapterRes = await fetch(`http://localhost:8087/get-chapters/${courseId}`);
        if (!chapterRes.ok) throw new Error('Failed to fetch chapters');
        
        let chaptersData = await chapterRes.json();
        if (!Array.isArray(chaptersData)) chaptersData = Object.values(chaptersData || {});

        // Sort by chapter_order in ascending order
        const sortedChapters = chaptersData.sort((a, b) => {
          const orderA = a.chapter_order || 999;
          const orderB = b.chapter_order || 999;
          return orderA - orderB;
        });

        // Fetch lectures for each chapter
        const mergedData = await Promise.all(
          sortedChapters.map(async (chapter) => {
            const chapterId = chapter.chapter_id || chapter.chapterId || chapter.id;
            try {
              const lecRes = await fetch(`http://localhost:8087/get-lecture-by-chapterId/${chapterId}`);
              if (!lecRes.ok) throw new Error(`Failed to fetch lectures for chapter ${chapterId}`);
              const lectures = await lecRes.json();
              return {
                ...chapter,
                lectures: Array.isArray(lectures) ? lectures : Object.values(lectures || {})
              };
            } catch (err) {
              console.warn(`Could not fetch lectures for chapter ${chapterId}:`, err);
              return { ...chapter, lectures: [] };
            }
          })
        );

        // Normalize lecture data
        const normalized = mergedData.map((chapter) => ({
          id: chapter.chapter_id || chapter.chapterId || chapter.id,
          order: chapter.chapter_order || 0,
          title: chapter.chapter_tilte || chapter.chapter_title || chapter.title || 'Untitled Chapter',
          lectures: chapter.lectures.map((lec, lecIdx) => ({
            id: lec.lectureId || lec.id || `lec-${chapter.id}-${lecIdx}`,
            title: lec.lectureTitle || lec.lecture_title || lec.title || 'Untitled Lesson',
            duration: lec.lectureDuration || lec.duration || 0,
            videoUrl: lec.lecture_url || lec.videoUrl || lec.url
          }))
        }));

        setChapters(normalized);
      } catch (err) {
        console.error('Curriculum Fetch Error:', err);
        setError(err.message || 'Failed to load curriculum');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading curriculum...</div>;
  if (error) return <div className="p-8 text-center text-red-600 font-semibold">Error: {error}</div>;
  if (chapters.length === 0) return <div className="p-8 text-center text-gray-500">No chapters found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Curriculum</h2>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="border-2 border-gray-100 rounded-xl overflow-hidden">
            {/* Chapter Header */}
            <div className="bg-gray-50 px-4 py-3 font-bold border-b text-sm uppercase flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">
                Chapter {chapter.order}
              </span>
              {chapter.title}
            </div>

            {/* Lectures List */}
            <div className="divide-y divide-gray-50">
              {chapter.lectures.length > 0 ? (
                chapter.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => {
                      setActiveLecture(lecture);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all ${
                      activeLecture?.id === lecture.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(lecture.id)}
                      onChange={(e) => toggleComplete(e, lecture.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm flex-1">{lecture.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{lecture.duration}m</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-sm text-gray-400">No lectures in this chapter</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
