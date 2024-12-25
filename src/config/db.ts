import mongoose, { MongooseError } from "mongoose";
import appConfig from "./app-config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(appConfig.dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: MongooseError | any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
