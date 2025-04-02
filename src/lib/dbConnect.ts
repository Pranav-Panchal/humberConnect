import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("❌ MongoDB URI is missing in environment variables.");
}

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Using existing MongoDB connection.");
            return;
        }

        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw new Error("MongoDB Connection Failed!");
    }
};

export default connectDB;
