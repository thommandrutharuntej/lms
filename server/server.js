import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mangodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoute.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'

const app = express()

await connectDB()
await connectCloudinary()

//middleware
app.use(cors())
app.use(clerkMiddleware())

app.get('/', (req, res) => { res.send('hello world') })
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw(type='application/json'), stripeWebhooks)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})