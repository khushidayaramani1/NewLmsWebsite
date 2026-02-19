import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const CallToAction = () => {
  return (
    <div className='px-6 py-10'>
      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-8 md:p-20 text-center max-w-6xl mx-auto shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
        
        <h2 className="relative z-10 font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
          Ready to start your <br className='hidden md:block'/> learning journey?
        </h2>
        <p className="relative z-10 text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Join over 10,000+ students already learning on our platform. Access world-class education anywhere.
        </p>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-600/30">
            Get Started Now
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
            Learn More <FaArrowRight size={14}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction