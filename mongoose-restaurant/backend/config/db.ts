import mongoose from "mongoose";
import { parsedEnvs } from "./variables";


export const connectDB=async()=>{
    try{
        await mongoose.connect(parsedEnvs.MONGODB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error connecting to MongoDB", error);
    }
}

export default connectDB;