import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <section className='w-full pt-20 md:pt-28 pb-10 px-4 md:px-8 bg-gradient-to-b from-[#E0F2FE] to-[var(--color-bg)] flex flex-col items-center justify-center text-center'>
      
      <div className='relative z-10 max-w-5xl mx-auto'>
        <h1 className='text-[var(--color-text-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold max-w-4xl mx-auto leading-[1.2] mb-6'>
          Empower your future with the <br className="hidden md:block" /> courses designed to <span className='text-[var(--color-primary)] relative whitespace-nowrap inline-block'>
            fit your choice.
            <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-[var(--color-primary)] opacity-80" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9.5C45 3.5 125 -2.5 198 8.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 10C55 6 125 1 195 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
            </svg>
          </span>
        </h1>

        <p className='text-[var(--color-text-secondary)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-10'>
          We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
        </p>

        <div className='w-full flex justify-center mb-10'>
          <SearchBar />
        </div>
      </div>

    </section>
  )
}

export default Hero
