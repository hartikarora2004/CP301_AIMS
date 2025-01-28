const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  const DB_URI = process.env.DATABASE_URL;

  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connectDB;
