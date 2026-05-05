import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyEnrollments = () => {
  const { enrolledCourses, allCourses, navigate } = useContext(AppContext)
  
  // Filter all courses based on what the user has enrolled in
  const myCourses = allCourses.filter(course => enrolledCourses.includes(course._id))

  const calculateTotalLectures = (course) => {
    return course.chapters?.reduce((acc, chap) => acc + chap.chapterContent.length, 0) || 0
  }

  // Generate a realistic, consistent mock progress based on course ID
  const getCourseProgress = (course) => {
    const total = calculateTotalLectures(course);
    const num = parseInt(course._id) || 1;
    let completed = 0;
    
    if (num === 2) completed = total; // 100% completed
    else if (num === 1) completed = Math.max(1, Math.floor(total * 0.4));
    else if (num === 3) completed = Math.max(1, Math.floor(total * 0.8));
    else completed = 1;

    const percent = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percent }
  }

  const getMockDuration = (id) => {
    const num = parseInt(id) || 1;
    if (num === 1) return '1 hour, 5 minutes';
    if (num === 2) return '57 hours';
    if (num === 3) return '1 hour, 3 minutes';
    return '49 hours, 30 minutes';
  }

  return (
    <div className='w-full min-h-screen bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 pt-10 pb-20 font-sans'>
      <h1 className='text-2xl md:text-[32px] font-bold text-[var(--color-text-primary)] mb-8'>My Enrollments</h1>

      {myCourses.length === 0 ? (
        <div className='text-center py-20 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] shadow-sm'>
          <h2 className='text-xl text-[var(--color-text-primary)] font-medium mb-3'>You are not enrolled in any courses yet.</h2>
          <p className='text-[var(--color-text-secondary)] mb-6'>Explore our catalog and start learning today!</p>
          <button 
            onClick={() => navigate('/course-list')}
            className='bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-8 py-2.5 rounded-md font-medium transition-colors cursor-pointer'
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className='overflow-x-auto bg-[var(--color-surface)] shadow-sm border border-[var(--color-border)] rounded-lg'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[var(--color-border)] text-[14px] font-semibold text-[var(--color-text-primary)] bg-[#fafafa]'>
                <th className='p-5 min-w-[350px]'>Course</th>
                <th className='p-5 whitespace-nowrap min-w-[150px]'>Duration</th>
                <th className='p-5 whitespace-nowrap min-w-[150px]'>Completed</th>
                <th className='p-5 whitespace-nowrap'>Status</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((course, index) => {
                const { completed, total, percent } = getCourseProgress(course)
                const isFinished = percent === 100;

                return (
                  <tr key={course._id} className='border-b border-[var(--color-border)] hover:bg-gray-50/50 transition-colors last:border-b-0'>
                    <td className='p-5'>
                      <div className='flex items-center gap-4 sm:gap-6'>
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className='w-24 sm:w-28 h-16 sm:h-20 object-cover rounded shadow-sm flex-shrink-0' 
                        />
                        <div className='flex-1'>
                          <p className='text-[15px] font-medium text-[var(--color-text-primary)] mb-2.5 line-clamp-2 leading-snug'>{course.title}</p>
                          <div className='w-full max-w-[280px] h-[6px] bg-gray-200 rounded-full overflow-hidden'>
                            <div 
                              className='h-full bg-[#3b82f6] rounded-full transition-all duration-500 ease-out' 
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='p-5 text-[14px] text-[var(--color-text-secondary)] align-middle'>
                      {getMockDuration(course._id)}
                    </td>
                    <td className='p-5 text-[14px] text-[var(--color-text-secondary)] align-middle'>
                      {completed} / {total} Lectures
                    </td>
                    <td className='p-5 align-middle'>
                      <button 
                        onClick={() => navigate(`/player/${course._id}`)}
                        className={`px-6 py-2 rounded font-medium text-[14px] text-white transition-colors cursor-pointer whitespace-nowrap shadow-sm ${
                          isFinished 
                            ? 'bg-[#2563eb] hover:bg-blue-700' 
                            : 'bg-[#3b82f6] hover:bg-blue-600'
                        }`}
                      >
                        {isFinished ? 'Completed' : 'On Going'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyEnrollments
