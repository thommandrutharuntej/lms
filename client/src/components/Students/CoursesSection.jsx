import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className='w-full bg-[var(--color-bg)] py-16 px-4 sm:px-6 md:px-8 lg:px-16'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl md:text-[34px] font-bold text-[var(--color-text-primary)] mb-4'>Learn from the best</h2>
        <p className='text-[var(--color-text-secondary)] text-sm md:text-[15px] max-w-3xl mx-auto'>
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>
      </div>

      {/* Course Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {/* CTA */}
      <div className='text-center mt-12'>
        <Link
          to="/course-list"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='inline-block border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium text-sm px-8 py-2.5 rounded hover:bg-gray-50 transition-colors'
        >
          Show all courses
        </Link>
      </div>
    </div>
  )
}

export default CoursesSection
