import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useLocation, Link, useMatch } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/react'
import { AppContext } from '../../Context/AppContext'

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext)
  const isEducatorRoute = useMatch('/educator/*')
  const pathname = useLocation().pathname
  const isHomePage = pathname === '/'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { openSignIn } = useClerk()
  const { user } = useUser()

  // Track scroll position so we can add bg when user scrolls down on homepage
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = isHomePage
    ? scrolled
      ? 'bg-white/88 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[0_10px_30px_rgba(37,99,235,0.10)]'
      : 'bg-white/72 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[0_10px_30px_rgba(37,99,235,0.08)]'
    : 'bg-white/92 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[0_10px_30px_rgba(37,99,235,0.10)]'

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className='flex items-center justify-between px-4 sm:px-10 md:px-20 lg:px-36 py-3.5 max-w-[1600px] mx-auto'>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2" onClick={() => navigate('/')}>
        <img className="w-9 h-9 rounded-full ring-4 ring-[rgba(37,99,235,0.20)] shadow-sm" src={assets.favicon} alt="EduTrack Logo" />
        <span className='text-xl font-extrabold text-[var(--color-text-primary)] transition-colors duration-300'>
          EduTrack
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <div className='flex items-center gap-4 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-300'>
          {user && <>
            <button
              onClick={() => navigate('/educator')}
              className='transition-colors hover:text-[var(--color-primary)]'
            >
              {isEducator ? 'Educator Dashboard' : 'Become an Educator'}
            </button>
            <span className='text-[var(--color-border)]'>|</span>
            <Link
              to="/my-enrollments"
              className='transition-colors hover:text-[var(--color-primary)]'
            >
              My Enrollments
            </Link>
          </>}
        </div>

        {!user ? (
          <button
            onClick={() => openSignIn()}
            className='px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white'
          >
            Sign In
          </button>
        ) : (
          <UserButton />
        )}
      </div>

      {/* Mobile Right */}
      <div className="md:hidden flex items-center gap-3">
        {!user ? (
          <button
            onClick={() => openSignIn()}
            className='px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white'
          >
            Sign In
          </button>
        ) : (
          <UserButton />
        )}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='focus:outline-none p-1 transition-colors text-[var(--color-text-secondary)]'
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className='absolute top-full right-0 left-0 bg-white/95 backdrop-blur-xl shadow-lg border-b border-[var(--color-border)] flex flex-col p-5 gap-4 md:hidden z-50'>
          {user && (
            <button
              onClick={() => { navigate('/educator'); setIsMenuOpen(false) }}
              className='text-left text-[var(--color-text-secondary)] text-sm font-medium hover:text-[var(--color-primary)] transition-colors'
            >
              {isEducator ? 'Educator Dashboard' : 'Become an Educator'}
            </button>
          )}
          {user && (
            <Link
              to="/my-enrollments"
              onClick={() => setIsMenuOpen(false)}
              className='text-left text-[var(--color-text-secondary)] text-sm font-medium hover:text-[var(--color-primary)] transition-colors'
            >
              My Enrollments
            </Link>
          )}
          {!user && (
            <button
              onClick={() => { openSignIn(); setIsMenuOpen(false) }}
              className='w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] py-2.5 rounded-full text-sm font-semibold transition-colors'
            >
              Sign In / Create Account
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default Navbar
