import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.MONGO_URI!,
};

export default appConfig