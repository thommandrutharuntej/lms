import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBar = ({ initialData = '' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [input, setInput] = useState(initialData)

  // Ensure input stays in sync if initialData changes (e.g., user hits back button)
  useEffect(() => {
    setInput(initialData)
  }, [initialData])

  const onSearchHandler = (e) => {
    e.preventDefault()
    // If we're not already on the course list page, navigate there
    if (!location.pathname.toLowerCase().includes('/course-list')) {
      navigate(input ? `/course-list/${input}` : `/course-list`)
    }
  }

  const handleInputChange = (e) => {
    const val = e.target.value
    setInput(val)
    
    // Live filter if we are already on the course list page
    if (location.pathname.toLowerCase().includes('/course-list')) {
      navigate(val ? `/course-list/${val}` : `/course-list`, { replace: true })
    }
  }

  return (
    <form onSubmit={onSearchHandler} className='flex items-center w-full max-w-2xl h-[56px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm overflow-hidden'>
      <div className='pl-5 pr-2 flex items-center text-[var(--color-text-secondary)]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        onChange={handleInputChange}
        value={input}
        type="text"
        placeholder='Search for courses'
        className='outline-none bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] w-full h-full text-[15px] px-2'
      />
      <button type="submit" className='h-[44px] mr-1.5 px-8 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white text-[15px] font-medium transition-colors rounded'>
        Search
      </button>
    </form>
  )
}

export default SearchBar
