import React, { useEffect, useRef, useState, useContext } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import uniqid from 'uniqid'
import { AppContext } from '../../Context/AppContext'

const AddCourse = () => {
  const { isEducator } = useContext(AppContext)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  // Initialize Quill editor only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Type course description here...',
      })
    }
  }, [])

  const handleAddChapter = () => {
    const title = prompt('Enter Chapter Name:')
    if (title) {
      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false,
      }
      setChapters([...chapters, newChapter])
    }
  }

  const handleChapter = (action, chapterId) => {
    if (action === 'toggle') {
      setChapters(
        chapters.map((c) =>
          c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c
        )
      )
    } else if (action === 'remove') {
      setChapters(chapters.filter((c) => c.chapterId !== chapterId))
    }
  }

  const handleAddLecture = (chapterId) => {
    setCurrentChapterId(chapterId)
    setShowPopup(true)
  }

  const addLecture = () => {
    // Basic validation
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert("Please fill all lecture details.")
      return
    }
    
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureId: uniqid(),
          }
          return { ...chapter, chapterContent: [...chapter.chapterContent, newLecture] }
        }
        return chapter
      })
    )
    setShowPopup(false)
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    })
  }

  const handleLecture = (action, chapterId, lectureId) => {
    if (action === 'remove') {
      setChapters(
        chapters.map((c) => {
          if (c.chapterId === chapterId) {
            return {
              ...c,
              chapterContent: c.chapterContent.filter((l) => l.lectureId !== lectureId)
            }
          }
          return c
        })
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const description = quillRef.current?.root.innerHTML
    
    // Simulating API call
    console.log("Submitting Course:", {
      courseTitle,
      courseDescription: description,
      coursePrice,
      discount,
      image,
      chapters
    })
    
    alert("Course saved successfully! (Check console for payload)")
  }

  return isEducator ? (
    <div className="w-full max-w-4xl text-left bg-white text-[var(--color-text-primary)]">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-sm">
          
        {/* Course Title */}
        <div>
          <label className="block font-medium mb-2">Course Title</label>
          <input 
            type="text" 
            placeholder="Type here" 
            className="w-full border border-[var(--color-border)] rounded px-4 py-2 outline-none focus:border-indigo-500 transition-colors"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block font-medium mb-2">Course Description</label>
          <div ref={editorRef} className="bg-white min-h-[150px] border border-[var(--color-border)] rounded-b outline-none"></div>
        </div>

        {/* Price & Thumbnail */}
        <div className="flex flex-wrap gap-8 items-start">
          <div className="w-full sm:w-auto">
            <label className="block font-medium mb-2">Course Price</label>
            <input 
              type="number" 
              placeholder="0" 
              className="w-full sm:w-32 border border-[var(--color-border)] rounded px-4 py-2 outline-none focus:border-indigo-500 transition-colors"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
              min="0"
            />
          </div>
          
          <div className="flex-1 flex flex-col items-start sm:items-end justify-center w-full">
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-600">Course Thumbnail</label>
              <label htmlFor="thumbnailUpload" className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <input 
                  type="file" 
                  id="thumbnailUpload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            {image && (
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-20 object-cover mt-3 rounded shadow-md border border-[var(--color-border)]" />
            )}
          </div>
        </div>

        {/* Discount */}
        <div className="w-full sm:w-auto">
          <label className="block font-medium mb-2">Discount %</label>
          <input 
            type="number" 
            placeholder="0" 
            className="w-full sm:w-32 border border-[var(--color-border)] rounded px-4 py-2 outline-none focus:border-indigo-500 transition-colors"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        {/* Chapters Section */}
        <div className="mt-4 flex flex-col gap-4">
          {chapters.map((chapter, index) => (
            <div key={chapter.chapterId} className="border border-[var(--color-border)] rounded-lg bg-white overflow-hidden shadow-sm transition-all duration-300">
              
              {/* Chapter Header */}
              <div 
                className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 transition-colors" 
                onClick={() => handleChapter('toggle', chapter.chapterId)}
              >
                <div className="flex items-center gap-3 font-bold text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 transition-transform duration-300 ${chapter.collapsed ? '-rotate-90' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px]">{index + 1} {chapter.chapterTitle}</span>
                </div>
                <div className="flex items-center gap-6 text-gray-500">
                  <span className="text-sm font-medium">{chapter.chapterContent.length} Lectures</span>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleChapter('remove', chapter.chapterId) }} className="hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Lectures List */}
              {!chapter.collapsed && (
                <div className="p-5 border-t border-[var(--color-border)] bg-white">
                  <div className="flex flex-col gap-3">
                    {chapter.chapterContent.map((lecture, lIndex) => (
                      <div key={lecture.lectureId} className="flex justify-between items-center text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          {lIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                          <a href={lecture.lectureUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 hover:underline">Link</a> - 
                          {lecture.isPreviewFree ? (
                            <span className="text-gray-500 font-medium ml-1">Free Preview</span>
                          ) : (
                            <span className="bg-blue-500 text-white px-2 py-0.5 rounded ml-1 font-medium text-xs">Paid</span>
                          )}
                        </span>
                        <button type="button" onClick={() => handleLecture('remove', chapter.chapterId, lecture.lectureId)} className="hover:text-red-500 text-gray-400 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => handleAddLecture(chapter.chapterId)} className="w-max mt-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm font-medium border border-[var(--color-border)] transition-colors">
                      + Add Lecture
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Chapter Btn */}
        <button type="button" onClick={handleAddChapter} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3.5 rounded-lg font-bold transition-colors text-center shadow-sm">
          + Add Chapter
        </button>

        {/* Submit */}
        <div className="mt-8 mb-10">
          <button type="submit" className="bg-black text-white px-10 py-3 rounded hover:bg-gray-800 transition-colors font-bold tracking-wide w-max shadow-md">
            ADD
          </button>
        </div>
          
      </form>

      {/* Add Lecture Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add Lecture</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-5 text-sm text-gray-700">
              <div>
                <label className="block font-medium mb-1.5">Lecture Title</label>
                <input 
                  type="text" 
                  className="w-full border border-[var(--color-border)] rounded px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1.5">Duration (minutes)</label>
                <input 
                  type="number" 
                  className="w-full border border-[var(--color-border)] rounded px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block font-medium mb-1.5">Lecture URL</label>
                <input 
                  type="url" 
                  className="w-full border border-[var(--color-border)] rounded px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <label className="font-medium text-gray-700">Is Preview Free?</label>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 cursor-pointer accent-blue-500"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.checked})}
                />
              </div>

              <button onClick={addLecture} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-2 font-bold shadow-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  ) : null
}

export default AddCourse
