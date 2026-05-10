import { clerkClient } from '@clerk/express'
import Course from '../modles/Course.js'
import { v2 as cloudinary } from 'cloudinary'


export const updateRoleToEducator = async (req, res) => {
    try {
        const { userId } = req.auth()
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: "educator"
            }
        })
        res.json({ success: true, message: "You can publish a course now" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Add New Course
export const addCourse = async (req, res) => {
    try {
        const courseData = req.body.courseData || req.body.CourseData
        const imageFile = req.file
        const { userId: educatorId } = req.auth()

        if (!imageFile) {
            return res.json({ success: false, message: "Thumbnail not attached" })
        }

        if (!courseData) {
            return res.json({ success: false, message: "courseData is missing from request body" })
        }

        const parsedCourseData = JSON.parse(courseData)

        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({ success: true, message: "Course created successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// Get Educator Courses

export const getEducatorCourses = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get educator dashboard data

export const educatorDashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const totalCourses = courses.length
        const courseIds = courses.map(course => course._id)
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: "completed" })
        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

        const enrolledStudents = []
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')

            students.forEach(student => {
                enrolledStudents.push({
                    courseTitle: course.title,
                    student
                })
            })

        }
        res.json({ success: true, dashboardData: { totalEarnings, enrolledStudents, totalCourses } })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Enrolled Students data with purchases data

export const getEnrolledStudents = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const courseIds = courses.map(course => course._id)
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: "completed" }).populate('userId', 'name imageUrl').populate('CourseId', 'CourseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.CourseId.CourseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({ success: true, enrolledStudents })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
} 