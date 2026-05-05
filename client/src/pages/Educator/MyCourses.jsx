import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { dummyCourses } from '../../assets/assets'

const MyCourses = () => {
  const { isEducator } = useContext(AppContext)

  // Augmenting dummy courses with mock earnings and dates to match the UI requirements
  const mockMyCourses = dummyCourses.map((course, index) => ({
    ...course,
    earnings: Math.floor(course.price * (course.enrolledStudents || 10) * 0.5), 
    students: course.enrolledStudents || Math.floor(Math.random() * 10) + 1,
    publishedOn: new Date(new Date().setDate(new Date().getDate() - index * 5)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
  }))

  return isEducator ? (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">My Courses</h2>
      
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-primary)] bg-gray-50/50">
                <th className="px-6 py-4 w-[50%]">All Courses</th>
                <th className="px-6 py-4 whitespace-nowrap">Earnings</th>
                <th className="px-6 py-4 whitespace-nowrap">Students</th>
                <th className="px-6 py-4 whitespace-nowrap">Published On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-sm text-[var(--color-text-secondary)] font-medium">
              {mockMyCourses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={course.image} alt={course.title} className="w-24 h-14 object-cover rounded-md shadow-sm border border-[var(--color-border)]" />
                      <span className="text-[var(--color-text-primary)] font-medium truncate max-w-xs">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">${course.earnings}</td>
                  <td className="px-6 py-4">{course.students}</td>
                  <td className="px-6 py-4 text-gray-500">{course.publishedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null
}

export default MyCourses
