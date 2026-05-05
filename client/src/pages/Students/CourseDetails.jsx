import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../components/Students/Loading'
import YouTube from 'react-youtube'

const StarRating = ({ rating }) => (
  <div className='flex items-center gap-0.5'>
    {[...Array(5)].map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${i < rating ? 'text-[#f87171]' : 'text-transparent stroke-[#f87171] stroke-2'}`}
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const CourseDetails = () => {
  const { id } = useParams()
  const { allCourses, enrolledCourses, setEnrolledCourses, navigate } = useContext(AppContext)
  const [courseData, setCourseData] = useState(null)
  const [openChapters, setOpenChapters] = useState({})
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(true)
  const [playerData, setPlayerData] = useState(null)
  const [enrollStatus, setEnrollStatus] = useState(null)

  const isAlreadyEnrolled = courseData ? enrolledCourses.includes(courseData._id) : false;

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    if (allCourses && id) {
      window.scrollTo(0, 0)
      setIsSimulatedLoading(true)
      
      const foundCourse = allCourses.find(c => c._id === id)
      setCourseData(foundCourse)
      // Open the first chapter by default if it exists
      if (foundCourse && foundCourse.chapters && foundCourse.chapters.length > 0) {
        setOpenChapters({ [foundCourse.chapters[0].chapterId]: true })
      }
      
      // Artificial delay to show loading state
      const timer = setTimeout(() => {
        setIsSimulatedLoading(false)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [allCourses, id])

  const toggleChapter = (chapterId) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const handleEnrollment = () => {
    if (isAlreadyEnrolled) {
      navigate('/my-enrollments')
    } else {
      setEnrolledCourses(prev => [...prev, courseData._id])
      setEnrollStatus('success')
      // Reset status to show "Already Enrolled" after 3 seconds
      setTimeout(() => {
        setEnrollStatus(null)
      }, 3000)
    }
  }

  if (isSimulatedLoading || !courseData) {
    return <Loading />
  }

  return (
    <div className='w-full min-h-screen bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 pt-10 pb-20 font-sans'>
      <div className='flex flex-col lg:flex-row gap-10 md:gap-16 max-w-[1400px] mx-auto'>
        
        {/* Left Column */}
        <div className='flex-1'>
          {/* Header Info */}
          <h1 className='text-3xl md:text-4xl lg:text-[42px] font-bold text-[var(--color-text-primary)] mb-4 leading-tight tracking-tight'>
            {courseData.title}
          </h1>
          <p className='text-[var(--color-text-secondary)] text-[15px] md:text-base leading-relaxed mb-4 max-w-3xl'>
            {courseData.description} Master modern skills by building real-world projects and comprehensive architectures step-by-step.
          </p>
          
          <div className='flex flex-wrap items-center gap-4 text-[14px] text-[var(--color-text-secondary)] mb-2'>
            <div className='flex items-center gap-1.5'>
              <span className='font-semibold text-[var(--color-text-primary)]'>{courseData.rating}</span>
              <StarRating rating={courseData.rating} />
              <span>({Math.floor(courseData.enrolledStudents / 10)} ratings)</span>
            </div>
            <span>•</span>
            <span>{courseData.enrolledStudents} students</span>
          </div>
          
          <p className='text-[14px] text-[var(--color-text-secondary)] mb-12'>
            Course by <span className='text-[var(--color-primary)] font-medium hover:underline cursor-pointer'>{courseData.educator}</span>
          </p>

          {/* Course Structure (Accordion) */}
          <div className='mb-10'>
            <h2 className='text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2'>Course Structure</h2>
            <p className='text-[14px] text-[var(--color-text-secondary)] mb-6'>
              {courseData.chapters?.length || 0} sections - {courseData.chapters?.reduce((acc, c) => acc + c.chapterContent.length, 0)} lectures - 27h 25m total duration
            </p>

            <div className='border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)] shadow-sm'>
              {courseData.chapters && courseData.chapters.map((chapter, index) => (
                <div key={chapter.chapterId} className={index !== 0 ? 'border-t border-[var(--color-border)]' : ''}>
                  {/* Chapter Header */}
                  <div 
                    onClick={() => toggleChapter(chapter.chapterId)}
                    className='flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors bg-[#f9fafb]'
                  >
                    <div className='flex items-center gap-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${openChapters[chapter.chapterId] ? 'rotate-180' : ''}`} 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className='font-semibold text-[var(--color-text-primary)] text-[15px]'>{chapter.chapterTitle}</span>
                    </div>
                    <span className='text-[13px] text-[var(--color-text-secondary)] hidden sm:block'>{chapter.chapterContent.length} lectures - 45 m</span>
                  </div>

                  {/* Chapter Content (Lectures) */}
                  {openChapters[chapter.chapterId] && (
                    <div className='px-5 py-2 bg-[var(--color-surface)]'>
                      {chapter.chapterContent.map((lecture, i) => (
                        <div key={lecture.lectureId} className='flex items-center justify-between py-3'>
                          <div className='flex items-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                            </svg>
                            <span className='text-[14px] text-[var(--color-text-secondary)]'>{lecture.lectureTitle}</span>
                          </div>
                          <div className='flex items-center gap-4 text-[13px]'>
                            {lecture.isPreviewFree && lecture.lectureUrl && (
                              <span 
                                onClick={() => setPlayerData({ videoId: extractVideoId(lecture.lectureUrl) })}
                                className='text-[var(--color-primary)] font-medium cursor-pointer hover:underline'
                              >
                                Preview
                              </span>
                            )}
                            <span className='text-[var(--color-text-secondary)]'>{lecture.lectureDuration || '10 mins'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course Description */}
          <div className='py-10 text-sm md:text-base'>
            <h3 className='text-xl font-semibold text-[var(--color-text-primary)] mb-5'>Course Description</h3>
            <div 
              className='text-[var(--color-text-secondary)] leading-relaxed pt-3 rich-text'
              dangerouslySetInnerHTML={{ __html: courseData.courseContent || courseData.description }}
            >
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Card) */}
        <div className='w-full lg:w-[380px] xl:w-[420px] flex-shrink-0'>
          <div className='sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden'>
            <img src={courseData.image} alt={courseData.title} className='w-full h-[220px] object-cover' />
            
            <div className='p-6'>
              <div className='flex items-center gap-2 mb-4 text-[#ef4444] text-[14px] font-medium'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 days left at this price!</span>
              </div>
              
              <div className='flex items-end gap-3 mb-4'>
                <span className='text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]'>${courseData.price}</span>
                <span className='text-lg text-[var(--color-text-secondary)] line-through mb-1'>${(courseData.price * 1.8).toFixed(2)}</span>
                <span className='text-sm text-[var(--color-text-secondary)] mb-1'>50% off</span>
              </div>
              
              <div className='flex items-center gap-4 text-[13px] text-[var(--color-text-secondary)] mb-6'>
                <div className='flex items-center gap-1'>
                  <span className='text-[#f87171] font-semibold'>{courseData.rating}</span>
                  <StarRating rating={1} />
                </div>
                <span>|</span>
                <div className='flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>30 hours</span>
                </div>
                <span>|</span>
                <div className='flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                  <span>54 lessons</span>
                </div>
              </div>
              
              <button 
                onClick={handleEnrollment}
                className={`w-full text-white font-medium py-3.5 rounded-lg transition-colors mb-6 text-[15px] cursor-pointer flex items-center justify-center gap-2 ${
                  isAlreadyEnrolled || enrollStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700 shadow-sm' 
                    : 'bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]'
                }`}
              >
                {enrollStatus === 'success' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 animate-bounce">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Enrollment Success!
                  </>
                ) : isAlreadyEnrolled ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Already Enrolled
                  </>
                ) : 'Enroll Now'}
              </button>
              
              <div className='text-left'>
                <h3 className='text-[16px] font-semibold text-[var(--color-text-primary)] mb-4'>What's in the course?</h3>
                <ul className='space-y-3 text-[14px] text-[var(--color-text-secondary)]'>
                  <li className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                    <span>Lifetime access with free updates.</span>
                  </li>
                  <li className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                    <span>Step-by-step, hands-on project guidance.</span>
                  </li>
                  <li className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                    <span>Downloadable resources and source code.</span>
                  </li>
                  <li className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                    <span>Quizzes to test your knowledge.</span>
                  </li>
                  <li className='flex items-start gap-2.5'>
                    <span className='mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0'></span>
                    <span>Certificate of completion.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Video Player Modal Overlay */}
      {playerData && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4' onClick={() => setPlayerData(null)}>
          <div 
            className='bg-white rounded-lg overflow-hidden shadow-2xl w-full max-w-4xl relative' 
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
              <h3 className='text-[16px] font-semibold text-[var(--color-text-primary)]'>Course Preview</h3>
              <button onClick={() => setPlayerData(null)} className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='aspect-video w-full bg-black flex items-center justify-center'>
              {playerData.videoId ? (
                <YouTube 
                  videoId={playerData.videoId} 
                  opts={{ playerVars: { autoplay: 1 } }} 
                  className='w-full h-full'
                  iframeClassName='w-full h-full' 
                />
              ) : (
                <div className='text-white flex items-center justify-center w-full h-full'>
                  Video preview not available.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetails
