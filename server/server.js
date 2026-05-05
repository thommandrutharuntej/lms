import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mangodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

await connectDB()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.send('hello world') })
app.post('/clerk', express.json(), clerkWebhooks)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})