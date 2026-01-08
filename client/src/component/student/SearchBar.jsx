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
    <div className='flex items-center w-full h-12 border rounded overflow-hidden'>
      <div className='pl-3 text-gray-400'><CiSearch size={22} /></div>
      <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        value={input}
        type='text'
        placeholder={placeholder}
        className='flex-1 text-lg px-3 py-2 outline-none'
      />
      <button onClick={onSearchHandler} className='bg-blue-600 hover:bg-blue-700 text-white px-4 h-full'>Search</button>
    </div>
  )
}

export default SearchBar
