import Course from "../modles/Course.js";

// Getting all courses data
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select(['-courseContent', '-enrolledStudents']).populate({ path: 'educator' })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
//Get course By Id

export const getCourseById = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' })

        if (!courseData) {
            return res.json({ success: false, message: "Course not found" })
        }

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {

                if (!lecture.isPreview) {
                    lecture.lectureUrl = ""
                }
            })
        })
        res.json({ success: true, courseData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
