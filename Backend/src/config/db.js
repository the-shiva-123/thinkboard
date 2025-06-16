import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables


export const connectDB = async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);

      console.log("MONGODB CONNECTED SUCCSESFULLY!")
    } catch (error) {
        console.log("Error Connecting to MONGODB",error);
        process.exit(1);
    }
}