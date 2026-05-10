import User from '../modles/User.js'
import Purchase from "../modles/Purchase.js";
import Stripe from 'stripe'
import Course from '../modles/Course.js'

// Get user data
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth()
        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }       
}   

// Users enrolled courses with lecture links
export const userEnrolledCourses = async (req, res) => {
    try{
        const { userId } = req.auth()
        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" })
        }
        const user = await User.findById(userId).populate('enrolledCourses')
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        res.json({ success: true, enrolledCourses: user.enrolledCourses })
    }
    catch(error){
        res.json({ success: false, message: error.message })
    }
}


// Purchase course
export const purchaseCourse = async (req, res) => {
    try {  
        const { userId } = req.auth()
        const { courseId } = req.body
        const origin = req.headers.origin || 'http://localhost:5173'

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' })
        }

        if (!courseId) {
            return res.status(400).json({ success: false, message: 'courseId is required' })
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ success: false, message: 'Stripe is not configured' })
        }

        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)
        if(!userData || !courseData){   
            return res.json({ success: false, message: "User or course not found" })
        }
        
        const coursePrice = Number(courseData.coursePrice ?? courseData.price)
        const discount = Number(courseData.discount ?? 0)
        const finalAmount = Number((coursePrice - (coursePrice * discount) / 100).toFixed(2))

        const purchase = new Purchase({
            courseId : courseData._id,
            userId : userData._id,
            amount: finalAmount,
        })
        const newPurchase = await Purchase.create(purchase)

        // Stripe payment intent
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        const currency = (process.env.CURRENCY || 'usd').toLowerCase()

        //Creating line items for Stripe checkout
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle,

                },
        unit_amount: Math.round(newPurchase.amount * 100),
            },
            quantity: 1,
        }]

        const session = await stripeInstance.checkout.sessions.create({
           success_url: `${origin}/loading/my-enrollments`,    
           cancel_url: `${origin}/`,
           line_items: line_items,
           mode: 'payment',
           metadata: {
            purchaseId: newPurchase._id.toString(),
           }
        })

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }   
}

