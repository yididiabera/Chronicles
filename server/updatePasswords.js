import mongoose from "mongoose";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;
const updatePasswords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log("MongoDB connected");

    // Find all users
    const users = await User.find();
    for (const user of users) {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
      await user.save();
    }
    console.log("Passwords updated successfully");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error updating passwords:", error);
  }
};

updatePasswords();
