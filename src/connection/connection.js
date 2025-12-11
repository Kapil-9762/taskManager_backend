import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const conn = async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("mongoDB connected")
        );  
    } catch(error) {
        res.status(400).json({
            message: "not connected",
        });
    }
}
conn();