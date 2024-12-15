import mongoose from "mongoose";

// connecting to database 
const dbConnection = async ()=> {
    return await mongoose.connect(process.env.MONGO_URI);
};

export default dbConnection