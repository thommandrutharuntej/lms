import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('error', () => console.log('Database Error'))
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectDB;