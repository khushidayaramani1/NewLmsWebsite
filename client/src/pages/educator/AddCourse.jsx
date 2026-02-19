import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useUser } from '@clerk/clerk-react';

const AddCourse = () => {
    const { user } = useUser();
    
    // Initialize form with a default structure: 1 chapter containing 1 lecture
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            chapters: [{ 
                chapterTilte: "", 
                chapterOrder: 1, 
                lectures: [{ lectureTitle: "", lectureDuration: "", lectureOrder: 1 }] 
            }]
        }
    });

    // 'chapters' field array: handles adding/removing chapter blocks
    const { fields: chapterFields, append: appendChapter } = useFieldArray({
        control,
        name: "chapters"
    });

    const onSubmit = async (data) => {
        // 1. Destructure to SEPARATE the file from the rest of the data
        const { thumbnailName, ...restOfData } = data;

        const courseInfo = {
            ...restOfData, // This no longer contains the 'thumbnailName' object
            educatorId: user?.id,
            coursePrice: parseInt(data.coursePrice),
        };

        const formData = new FormData();
        
        // 2. Append the file separately (this is the correct way for Multipart)
        if (thumbnailName?.[0]) {
            formData.append("imageFile", thumbnailName[0]);
        }

        // 3. Convert the clean JS Object (without the FileList) into a JSON Blob
        const jsonBlob = new Blob([JSON.stringify(courseInfo)], { type: 'application/json' });
        formData.append("cd", jsonBlob);

        try {
            const res = await fetch('http://localhost:8087/add-course-detail', {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            if (res.ok) alert("Course Saved Successfully!");
        } catch (err) {
            console.error("Submission failed:", err);
        }
    };

    return (
        <div className="w-full max-w-3xl lg:max-w-5xl mx-auto p-2 sm:p-4 md:p-8 bg-white shadow-2xl rounded-2xl sm:rounded-3xl my-6 sm:my-10 border border-gray-100">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-center">New Course Studio</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 sm:gap-10'>
                
                {/* COURSE BASICS: Simple inputs mapped directly to CourseDetail entity */}
                <div className="bg-gray-50/50 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold border-l-4 border-black pl-2 sm:pl-4">Course Basics</h2>
                    <input {...register("courseTitle")} placeholder="Course Title" className="w-full p-2 border-b outline-none text-base" />
                    <textarea {...register("courseDescription")} placeholder="Description" className="w-full p-2 border rounded-lg sm:rounded-xl text-base" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <input {...register("coursePrice")} placeholder="Price (e.g. 49)" className="p-2 border-b text-base" />
                        <input type="file" {...register("thumbnailName")} className="text-sm" />
                    </div>
                </div>

                {/* CURRICULUM: The dynamic part of the form */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                        <h2 className="text-lg sm:text-2xl font-bold">Curriculum</h2>
                        <button 
                            type="button" 
                            onClick={() => appendChapter({ chapterTilte: "", chapterOrder: chapterFields.length + 1, lectures: [] })}
                            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 text-sm sm:text-base"
                        >
                            + Add Chapter
                        </button>
                    </div>
                    {/* Loop through chapters in the form state */}
                    {chapterFields.map((chapter, index) => (
                        <ChapterItem 
                            key={chapter.id} 
                            chapterIndex={index} 
                            register={register} 
                            control={control} 
                        />
                    ))}
                </div>

                <button className='bg-black text-white px-8 sm:px-16 py-3 sm:py-4 rounded-full self-center font-bold hover:scale-105 transition-transform text-base sm:text-lg'>
                    SUBMIT COURSE FOR REVIEW
                </button>
            </form>
        </div>
    );
};

// Sub-component to manage Lectures inside a specific Chapter
const ChapterItem = ({ chapterIndex, register, control }) => {
    // This field array manages lectures specifically for THIS chapter index
    const { fields: lectureFields, append: appendLecture } = useFieldArray({
        control,
        name: `chapters.${chapterIndex}.lectures`
    });

    return (
        <div className="border-2 border-gray-200 p-4 sm:p-8 rounded-xl sm:rounded-3xl bg-white relative">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Chapter Title</label>
                    <input {...register(`chapters.${chapterIndex}.chapterTilte`)} placeholder="Chapter Title" className="w-full p-2 border-b focus:border-black outline-none text-base" />
                </div>
                <div className="w-20 sm:w-24">
                    <label className="text-xs font-bold text-gray-400 uppercase">Order</label>
                    <input {...register(`chapters.${chapterIndex}.chapterOrder`)} placeholder="1" className="w-full p-2 border-b outline-none text-base" />
                </div>
            </div>

            <div className="ml-2 sm:ml-8 space-y-3 sm:space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lectures</p>
                {lectureFields.map((lecture, lIndex) => (
                    <div key={lecture.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 bg-gray-50 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100">
                        <input {...register(`chapters.${chapterIndex}.lectures.${lIndex}.lectureTitle`)} placeholder="Lecture Title" className="p-2 border rounded bg-white text-base" />
                        <input {...register(`chapters.${chapterIndex}.lectures.${lIndex}.lectureDuration`)} placeholder="Duration (min)" className="p-2 border rounded bg-white text-base" />
                        <input {...register(`chapters.${chapterIndex}.lectures.${lIndex}.lectureOrder`)} placeholder="Order" className="p-2 border rounded bg-white text-base" />
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={() => appendLecture({ lectureTitle: "", lectureDuration: "", lectureOrder: lectureFields.length + 1 })}
                    className="text-blue-500 text-xs sm:text-sm font-bold hover:underline"
                >
                    + Add Lecture to this Chapter
                </button>
            </div>
        </div>
    );
};

export default AddCourse;