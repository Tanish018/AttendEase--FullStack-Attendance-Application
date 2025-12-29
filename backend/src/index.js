import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import studentRoutes from './routes/student.route.js'
import contactRoutes from './routes/contact.route.js'
import attendanceRoutes from './routes/attendance.route.js'
import { connectDb } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, "../../Frontend/dist");

app.use("/api/auth", authRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/feedback", contactRoutes)
app.use("/api/attendance", attendanceRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

app.listen(PORT, ()=> {
  console.log("Server is running on Port : "+ PORT );
  connectDb();
})