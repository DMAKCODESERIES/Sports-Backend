import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB=async()=>{
 await mongoose.connect(process.env.MONGODB_URI)
 .then(()=>console.log("MongoDB connected..."))
 .catch(err=>console.error("Error connecting to MongoDB:", err))
}
export default connectDB()     