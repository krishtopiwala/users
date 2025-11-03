import mongoose from "mongoose";

const connectDB = async (DBURL : String) => {
    try {
        await mongoose.connect(String(DBURL));
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;