const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected: ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error; // Re-throw to handle in index.js
  }
};

module.exports = connectDB;
