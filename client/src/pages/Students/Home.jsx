import React from 'react'
import Hero from '../../components/Students/Hero'
import Companies from '../../components/Students/Companies'
import CoursesSection from '../../components/Students/CoursesSection'
import TestimonailsSection from '../../components/Students/TestimonailsSection'
import CallToAction from '../../components/Students/CallToAction'

const Home = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonailsSection />
      <CallToAction />
    </div>
  )
}

export default Home
