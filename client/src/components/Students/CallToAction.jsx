import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='w-full bg-[var(--color-bg)] py-20 px-4 sm:px-6 md:px-8 lg:px-12'>
      <div className='relative max-w-2xl mx-auto text-center'>
        
        {/* Heading */}
        <h2 className='text-3xl md:text-[34px] font-bold text-[var(--color-text-primary)] mb-5'>
          Learn anything, anytime, anywhere
        </h2>

        {/* Subtext */}
        <p className='text-[var(--color-text-secondary)] text-[15px] mb-10'>
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
          <Link
            to="/course-list"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='w-full sm:w-auto px-8 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-medium rounded transition-colors text-[15px]'
          >
            Get started
          </Link>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='w-full sm:w-auto flex items-center justify-center gap-2 text-[var(--color-text-primary)] font-medium transition-colors text-[15px] hover:text-[var(--color-primary)]'
          >
            Learn more 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
