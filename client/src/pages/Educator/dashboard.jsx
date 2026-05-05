import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { isEducator } = useContext(AppContext)

  // Mock data matching the UI requirement
  const dashboardData = {
    totalEnrolments: 5,
    totalCourses: 8,
    totalEarnings: 707.38,
    latestEnrolments: [
      { id: 1, studentName: 'Great Stack', courseTitle: 'Introduction to JavaScript' },
      { id: 2, studentName: 'Great Stack', courseTitle: 'Advanced Python Programming' },
      { id: 3, studentName: 'Great Stack', courseTitle: 'Web Development Bootcamp' },
      { id: 4, studentName: 'Great Stack', courseTitle: 'Data Science with Python' },
      { id: 5, studentName: 'Great Stack', courseTitle: 'Cybersecurity Basics' }
    ]
  }

  return isEducator ? (
    <div className="flex flex-col gap-8 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Enrolments Card */}
        <div className="flex items-center gap-5 p-6 bg-white border border-[var(--color-border)] rounded-lg shadow-sm transition-transform hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 rounded bg-indigo-50 flex items-center justify-center text-[var(--color-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{dashboardData.totalEnrolments}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-0.5">Total Enrolments</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="flex items-center gap-5 p-6 bg-white border border-[var(--color-border)] rounded-lg shadow-sm transition-transform hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 rounded bg-indigo-50 flex items-center justify-center text-[var(--color-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{dashboardData.totalCourses}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-0.5">Total Courses</p>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="flex items-center gap-5 p-6 bg-white border border-[var(--color-border)] rounded-lg shadow-sm transition-transform hover:-translate-y-1 duration-300">
          <div className="w-14 h-14 rounded bg-indigo-50 flex items-center justify-center text-[var(--color-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">${dashboardData.totalEarnings}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-0.5">Total Earnings</p>
          </div>
        </div>

      </div>

      {/* Latest Enrolments Table */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Latest Enrolments</h3>
        <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-primary)] bg-gray-50/50">
                  <th className="px-6 py-4 w-16">#</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Course Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-sm text-[var(--color-text-secondary)] font-medium">
                {dashboardData.latestEnrolments.map((enrolment, index) => (
                  <tr key={enrolment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={assets.favicon} alt="Logo" className="w-8 h-8 rounded-full object-contain" />
                        <span className="text-[var(--color-text-primary)]">{enrolment.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{enrolment.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Dashboard
