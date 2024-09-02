import mongoose from "mongoose";

const URI = process.env.MONGO_URL;

const connectDB = async() =>{
    
await mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
console.log("DB connect... ")

} 


export default connectDB