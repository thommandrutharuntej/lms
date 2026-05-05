import React, { useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import SearchBar from '../../components/Students/SearchBar'
import CourseCard from '../../components/Students/CourseCard'

const CoursesList = () => {
  const navigate = useNavigate()
  const { data } = useParams()
  const { allCourses } = useContext(AppContext)

  const filteredCourses = data
    ? allCourses.filter(course => course.title.toLowerCase().includes(data.toLowerCase()))
    : allCourses;

  return (
    <div className='w-full min-h-screen bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 pt-10 pb-20'>

      {/* Top Header Section */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 max-w-[1400px] mx-auto'>
        <div>
          <h1 className='text-3xl md:text-[32px] font-bold text-[var(--color-text-primary)] mb-1'>Course List</h1>
          <p className='text-[13px] text-[var(--color-text-secondary)]'>
            <Link to='/' className='text-[var(--color-primary)] hover:underline'>Home</Link>
            <span className='mx-1.5'>/</span>
            <span>Course List</span>
          </p>
        </div>
        <div className='w-full md:w-auto md:min-w-[420px]'>
          <SearchBar initialData={data} />
        </div>
      </div>

      {/* Active Filter Chip */}
      {data && (
        <div className='max-w-[1400px] mx-auto mb-8 flex items-center'>
          <div className='inline-flex items-center gap-3 px-4 py-1.5 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded bg-[var(--color-surface)] text-[15px] shadow-sm'>
            <span className='font-medium'>{data}</span>
            <button onClick={() => navigate('/course-list')} className='hover:text-red-500 transition-colors flex items-center justify-center cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Grid Section */}
      <div className='max-w-[1400px] mx-auto'>
        {filteredCourses.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14'>
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20 text-[var(--color-text-secondary)]'>
            No courses found matching "{data}".
          </div>
        )}

        {/* Load More Button
        {filteredCourses.length > 0 && (
          <div className='flex justify-center'>
            <button className='border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium px-12 py-2.5 rounded hover:bg-gray-50 transition-colors text-[14px]'>
              Load more
            </button>
          </div>
        )} */}
      </div>

    </div>
  )
}

export default CoursesList
