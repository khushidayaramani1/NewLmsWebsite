
import {Link} from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import CourseCard from './CourseCard.jsx';
import course_1 from '../../assets/assets/course_1.png';



const CourseSection = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-20'>
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
        <div className='max-w-xl'>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Learn from the best</h2>
          <p className="text-slate-500 text-lg">Discover top-rated courses across various categories crafted to deliver real-world results.</p>
        </div>
        <Link 
          to="/course-list" 
          onClick={() => window.scrollTo(0,0)}
          className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all"
        >
          View all courses <FaArrowRight size={14}/>
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Course Cards go here - ensure the Card has a hover:shadow-xl and hover:-translate-y-2 */}
        <CourseCard image={course_1} courseName="Build Text to image SaaS App" rating="4.8" price="67.8" />
        {/* ... others */}
      </div>

      <div className='mt-12 md:hidden flex justify-center'>
        <Link to="/course-list" className="bg-white border border-slate-200 px-8 py-3 rounded-full font-medium text-slate-700 shadow-sm">
          Show all Courses
        </Link>
      </div>
    </div>
  )
}

export default CourseSection;