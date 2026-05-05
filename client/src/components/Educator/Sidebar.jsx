import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/educator/educator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      name: 'Add Course',
      path: '/educator/add-course',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'My Courses',
      path: '/educator/my-courses',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
        </svg>
      )
    },
    {
      name: 'Student Enrolled',
      path: '/educator/student-enrolled',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    }
  ]

  return isEducator ? (
    <div className="md:w-64 w-16 border-r border-[var(--color-border)] bg-white flex flex-col py-6 transition-all duration-300">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator/educator'}
            className={({ isActive }) => 
              `flex items-center md:flex-row flex-col gap-3 px-4 md:px-8 py-3.5 transition-colors relative ${
                isActive 
                  ? 'bg-indigo-50 text-[var(--color-text-primary)] border-r-[4px] border-[var(--color-primary)]' 
                  : 'text-[var(--color-text-secondary)] hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`${isActive ? 'text-[var(--color-text-primary)]' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className={`hidden md:block text-[15px] whitespace-nowrap ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  ) : null
}

export default Sidebar
