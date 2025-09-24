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

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/feedback", contactRoutes)
app.use("/api/attendance", attendanceRoutes)

app.listen(PORT, ()=> {
  console.log("Server is running on Port : "+ PORT );
  connectDb();
})