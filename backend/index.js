import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import database from "./utils/database.js";


dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser());

database();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});