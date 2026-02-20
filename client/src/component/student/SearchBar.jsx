import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'

const SearchBar = ({ placeholder = 'Search for Course' }) => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const onSearchHandler = () => {
    // const query = input.trim()
    // if (!query) return
    navigate('/course-list/')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSearchHandler()
  }

  return (
    <div className='flex items-center w-full h-14 md:h-16 bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:border-blue-400 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl focus-within:shadow-blue-200/50'>
      <div className='pl-4 md:pl-5 text-slate-400'><CiSearch size={24} /></div>
      <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        value={input}
        type='text'
        placeholder={placeholder}
        className='flex-1 text-base md:text-lg px-3 md:px-4 py-2 outline-none text-slate-700 placeholder:text-slate-400'
      />
      <button 
        onClick={onSearchHandler} 
        className='bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 h-full font-semibold transition-all duration-300 hover:shadow-lg active:scale-95'
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
