import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "https://moviemate-frontend.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true // if you use cookies later
  })
);

app.use(express.json());

// ✅ Your routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
