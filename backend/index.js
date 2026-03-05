import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import database from "./utils/database.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

database();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});