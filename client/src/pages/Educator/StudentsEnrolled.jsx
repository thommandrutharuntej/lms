import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const StudentsEnrolled = () => {
  const { isEducator } = useContext(AppContext)

  // Mock data matching the UI requirement
  const enrolledStudents = [
    { id: 1, studentName: 'GreatStack', courseTitle: 'Introduction to JavaScript', date: '12/20/2024' },
    { id: 2, studentName: 'GreatStack', courseTitle: 'Introduction to JavaScript', date: '12/20/2024' },
    { id: 3, studentName: 'GreatStack', courseTitle: 'Advanced Python Programming', date: '12/20/2024' },
    { id: 4, studentName: 'GreatStack', courseTitle: 'Web Development Bootcamp', date: '12/20/2024' }
  ]

  return isEducator ? (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Students Enrolled</h2>
      
      <div className="bg-white rounded-lg border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-primary)] bg-gray-50/50">
                <th className="px-6 py-4 w-16">#</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Course Title</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-sm text-[var(--color-text-secondary)] font-medium">
              {enrolledStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={assets.favicon} alt="Avatar" className="w-8 h-8 rounded-full object-contain" />
                      <span className="text-[var(--color-text-primary)]">{student.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student.courseTitle}</td>
                  <td className="px-6 py-4 text-gray-500">{student.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null
}

export default StudentsEnrolled
