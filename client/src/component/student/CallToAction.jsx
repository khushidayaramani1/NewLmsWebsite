import React from 'react';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <div className='px-6 py-9 md:py-20 ml-40! bg-white w-full'>
      <div className="relative overflow-hidden bg-[#0f172a] rounded-[2.5rem] p-10 md:p-20 text-center max-w-6xl mx-auto shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm inline-block">
            <FaRocket className="text-blue-400 text-xl" />
          </div>

          <h2 className="font-extrabold text-4xl md:text-6xl text-white mb-6 tracking-tight leading-[1.1]">
            Ready to shape your <br className='hidden md:block'/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              professional future?
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-5 mt-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95">
              Get Started Now <FaArrowRight />
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-xl font-bold transition-all backdrop-blur-md active:scale-95">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction;