import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.CONNECTION_STRING ||
  "mongodb+srv://m001-student:abhi@sandbox.1tynyfo.mongodb.net/Whatsapp-clone";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(url, {
    //   useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected To Database ${conn.connection.host}`);
    return mongoose.connection
  } catch (error) {
    console.log(`Error in Connecting Database ${error}`);
  }
};

export default connectDB;
