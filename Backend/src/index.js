import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();


app.use("/api/auth" , authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req,res) => {
    console.log("backend is running")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})
