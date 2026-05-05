import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'

const Navbar = () => {
  const { user } = useUser()

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-10 py-3.5 max-w-[1600px] mx-auto">

        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.favicon} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-extrabold text-[var(--color-text-primary)]">EduTrack</span>
        </Link>

        {/* Right Side: Profile */}
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-[var(--color-text-secondary)] hidden sm:block font-medium">
            Hi! {user ? user.fullName || user.firstName : 'Richard'}
          </span>
          {user ? (
            <UserButton />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
