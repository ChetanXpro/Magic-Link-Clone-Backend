require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URI);
    console.log('db connected')
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
