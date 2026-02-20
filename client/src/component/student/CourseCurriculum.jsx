import React, { useState, useEffect } from 'react';


const CourseCurriculum = ({ courseId }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setError('Course ID is required');
      setLoading(false);
      return;
    }

    const fetchChapters = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch chapters from API
        const response = await fetch(`http://localhost:8087/get-chapters/${courseId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch chapters: ${response.statusText}`);
        }

        let chaptersData = await response.json();
        
        // Handle case where API returns an object instead of array
        if (!Array.isArray(chaptersData)) {
          chaptersData = Object.values(chaptersData || {});
        }

        if (!Array.isArray(chaptersData) || chaptersData.length === 0) {
          setChapters([]);
          return;
        }

        // Sort chapters by chapter_order in ascending order
        const sortedChapters = chaptersData.sort((a, b) => {
          const orderA = a.chapter_order ?? 999;
          const orderB = b.chapter_order ?? 999;
          return orderA - orderB;
        });

        setChapters(sortedChapters);
      } catch (err) {
        console.error('Error fetching chapters:', err);
        setError(err.message || 'Failed to load curriculum');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-semibold text-sm">Error loading curriculum</p>
        <p className="text-red-600 text-xs mt-1">{error}</p>
      </div>
    );
  }

  // Empty state
  if (chapters.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 text-sm">No chapters available for this course</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6 px-6 pt-6">Course Curriculum</h3>
      
      {/* Timeline/Vertical List */}
      <div className="relative px-6 pb-6">
        {/* Vertical line for timeline effect */}
        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-200"></div>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => {
            const chapterId = chapter.chapter_id || chapter.chapterId || chapter.id || index;
            const title = chapter.chapter_tilte || chapter.chapter_title || chapter.title || 'Untitled Chapter';
            const order = chapter.chapter_order || index + 1;
            const isExpanded = expandedChapter === chapterId;

            return (
              <div
                key={chapterId}
                className="relative pl-8 cursor-pointer group"
                onClick={() => setExpandedChapter(isExpanded ? null : chapterId)}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-md transition-transform group-hover:scale-110"></div>

                {/* Chapter Card */}
                <div
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isExpanded
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* Chapter Label */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                        Chapter {order}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-800 leading-snug">{title}</h4>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>

                  {/* Additional Info (expandable) */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Chapter ID:</span> {chapterId}
                      </p>
                      {chapter.description && (
                        <p className="text-xs text-gray-600 mt-2">{chapter.description}</p>
                      )}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <button className="px-3 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">
                          View Lessons
                        </button>
                        <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300 transition">
                          Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
        <p className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">{chapters.length}</span> chapters in this course
        </p>
      </div>
    </div>
  );
};

export default CourseCurriculum;
