import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Educator/Navbar'
import Sidebar from '../../components/Educator/Sidebar'
import Footer from '../../components/Educator/footer'

const Educator = () => {
  return (
    <div className='text-[15px] min-h-screen bg-white flex flex-col'>
      <Navbar />
      <div className='flex flex-1'>
        <Sidebar />
        <div className='flex-1 p-6 md:p-10'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Educator
