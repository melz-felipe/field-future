import dotenv from "dotenv";
dotenv.config();

export default {
  appEnv: "production",
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
};
