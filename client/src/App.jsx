import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/Students/Home'
import CoursesList from './pages/Students/CoursesList'
import CourseDetails from './pages/Students/CourseDetails'
import MyEnrollments from './pages/Students/MyEnrollments'
import Player from './pages/Students/Player'
import Loading from './components/Students/Loading'
import Educator from './pages/Educator/educator'
import Dashboard from './pages/Educator/dashboard'
import AddCourse from './pages/Educator/AddCourse'
import MyCourses from './pages/Educator/MyCourses'
import StudentsEnrolled from './pages/Educator/StudentsEnrolled'
import Navbar from './components/Students/Navbar'
import Footer from './components/Students/footer'

const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-[15px] leading-[19px] min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]'>
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Other pages are constrained by max-w-[1400px] */}
        <Route path="/course-list" element={<div className='max-w-[1400px] mx-auto'><CoursesList /></div>} />
        <Route path="/course-list/:data" element={<div className='max-w-[1400px] mx-auto'><CoursesList /></div>} />
        <Route path="/course/:id" element={<div className='max-w-[1400px] mx-auto'><CourseDetails /></div>} />
        <Route path="/my-enrollments" element={<div className='max-w-[1400px] mx-auto'><MyEnrollments /></div>} />
        <Route path="/player/:id" element={<div className='max-w-[1400px] mx-auto'><Player /></div>} />
        <Route path="/loading/:path" element={<div className='max-w-[1400px] mx-auto'><Loading /></div>} />
        
        <Route path="/educator" element={<Educator />}>
          <Route path='educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
      {!isEducatorRoute && <Footer />}
    </div>
  )
}

export default App
