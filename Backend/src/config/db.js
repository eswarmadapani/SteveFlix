// MongoDB connection database now this is the connection file
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log("Error: MONGODB_URI is undefined in .env file");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
};

export default connectDB;
