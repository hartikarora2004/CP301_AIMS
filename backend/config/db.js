const mongoose = require("mongoose");

const connectDB = async () => {
  const DB_URI =
    "mongodb+srv://pranavmenon2025:lDh5FqImNCDMXcwS@cluster0.4ky7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
