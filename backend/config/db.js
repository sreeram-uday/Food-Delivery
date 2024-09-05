import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://Abhi_45:MEwNuol56pBv8yET@cluster0.vdq8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log("DB Connected"));
}




//MEwNuol56pBv8yET