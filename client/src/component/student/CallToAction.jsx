import React from 'react'

const CallToAction = () => {
  return (
    <>
      <div className="!my-20 flex flex-col text-center justify-center items-center space-y-7!"> 
        <div className="font-semibold text-3xl">Learn anything, anytime, anywhere</div>
        <div className="text-gray-600 text-center" >Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</div>
        <div className="flex gap-10" >
          <button className=" bg-blue-500 text-white px-4 py-2 rounded-md">Get Started</button>
          <button className=" flex flex-row gap-2 items-center ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md"><p>Learn More</p> <FaArrowRight /></button>
        </div>
      </div>
    </>
  )
}

export default CallToAction
