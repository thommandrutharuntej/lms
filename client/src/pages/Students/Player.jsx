import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import Loading from '../../components/Students/Loading'
import YouTube from 'react-youtube'
import { Rating } from 'react-simple-star-rating'

const Player = () => {
  const { id } = useParams()
  const { allCourses } = useContext(AppContext)
  const [courseData, setCourseData] = useState(null)
  const [openChapters, setOpenChapters] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [rating, setRating] = useState(0)

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    if (allCourses && id) {
      window.scrollTo(0, 0)
      const foundCourse = allCourses.find(c => c._id === id)
      setCourseData(foundCourse)

      if (foundCourse && foundCourse.chapters && foundCourse.chapters.length > 0) {
        setOpenChapters({ [foundCourse.chapters[0].chapterId]: true })
        // Set initial video
        if (foundCourse.chapters[0].chapterContent.length > 0) {
          setPlayerData({ 
            videoId: extractVideoId(foundCourse.chapters[0].chapterContent[0].lectureUrl),
            title: foundCourse.chapters[0].chapterContent[0].lectureTitle
          })
        }
      }
    }
  }, [allCourses, id])

  const toggleChapter = (chapterId) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const handleRating = (rate) => {
    setRating(rate)
  }

  if (!courseData) {
    return <Loading />
  }

  return (
    <div className='w-full min-h-screen bg-transparent px-4 sm:px-6 md:px-8 lg:px-16 pt-10 pb-20 font-sans'>
      <div className='flex flex-col-reverse lg:flex-row gap-10 md:gap-16 max-w-[1400px] mx-auto'>
        
        {/* Left Column - Course Structure */}
        <div className='flex-1 lg:max-w-[45%]'>
          <h2 className='text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-6'>Course Structure</h2>
          
          <div className='border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)] shadow-sm mb-8'>
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
                  <span className='text-[13px] text-[var(--color-text-secondary)] hidden sm:block'>
                    {chapter.chapterContent.length} lectures - {
                      chapter.chapterContent.reduce((acc, curr) => {
                        const mins = parseInt(curr.lectureDuration) || 0;
                        return acc + mins;
                      }, 0)
                    } minutes
                  </span>
                </div>

                {/* Chapter Content (Lectures) */}
                {openChapters[chapter.chapterId] && (
                  <div className='px-5 py-2 bg-[var(--color-surface)]'>
                    {chapter.chapterContent.map((lecture, i) => {
                      const isCurrentVideo = playerData?.videoId === extractVideoId(lecture.lectureUrl);
                      return (
                        <div key={lecture.lectureId} className='flex items-center justify-between py-3'>
                          <div className='flex items-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isCurrentVideo ? "var(--color-primary)" : "currentColor"} className={`w-5 h-5 ${isCurrentVideo ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
                              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                            </svg>
                            <span className={`text-[14px] ${isCurrentVideo ? 'text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-secondary)]'}`}>
                              {lecture.lectureTitle}
                            </span>
                          </div>
                          <div className='flex items-center gap-4 text-[13px]'>
                            <span 
                              onClick={() => setPlayerData({ 
                                videoId: extractVideoId(lecture.lectureUrl),
                                title: lecture.lectureTitle 
                              })}
                              className='text-[var(--color-primary)] font-medium cursor-pointer hover:underline'
                            >
                              Watch
                            </span>
                            <span className='text-[var(--color-text-secondary)] min-w-[50px] text-right'>{lecture.lectureDuration || '10 mins'}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='flex items-center gap-4 mt-8 bg-[var(--color-surface)] p-5 border border-[var(--color-border)] rounded-lg shadow-sm w-fit'>
            <h3 className='text-[16px] font-semibold text-[var(--color-text-primary)]'>Rate this Course:</h3>
            <div className='flex items-center'>
              <Rating 
                onClick={handleRating} 
                initialValue={rating} 
                size={28} 
                transition 
                fillColor="#eab308"
                emptyColor="#e5e7eb"
                className='flex flex-row'
                SVGstyle={{ display: 'inline-block' }}
              />
            </div>
            {rating > 0 && <span className='text-[14px] text-[var(--color-text-secondary)] ml-2'>Thanks for rating!</span>}
          </div>
        </div>

        {/* Right Column - Video Player */}
        <div className='flex-1 lg:max-w-[55%]'>
          {playerData ? (
            <div className='sticky top-24'>
              <div className='bg-black rounded-xl overflow-hidden shadow-lg aspect-video mb-5 ring-1 ring-white/10'>
                <YouTube 
                  videoId={playerData.videoId} 
                  opts={{ 
                    playerVars: { 
                      autoplay: 1,
                      rel: 0,
                      modestbranding: 1
                    } 
                  }} 
                  className='w-full h-full'
                  iframeClassName='w-full h-full border-0' 
                />
              </div>
              <div className='bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm'>
                <h2 className='text-2xl font-bold text-[var(--color-text-primary)] mb-2'>{playerData.title}</h2>
                <div className='flex items-center gap-2 text-[14px] text-[var(--color-text-secondary)]'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                  <p>Module: {courseData.title}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm aspect-video flex flex-col items-center justify-center p-8 text-center'>
              <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[var(--color-primary)]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-[var(--color-text-primary)] mb-2'>Ready to learn?</h3>
              <p className='text-[var(--color-text-secondary)] text-[15px]'>Select any lecture from the course structure on the left to start watching.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Player
