import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ Fix here

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes); // ✅ Fix here

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
