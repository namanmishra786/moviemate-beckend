import express from "express";
import {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getPublicMovies,
  getAllPublicMovies,
  togglePublic   // ✅ Added comma above
} from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";
import Movie from "../models/Movie.js";

const router = express.Router();

// ✅ Public routes first
router.get("/public/:username", getPublicMovies);
router.get("/public-feed", getAllPublicMovies);

// ✅ Private routes next
router.use(protect);

router.post("/", addMovie);
router.get("/", getMovies);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
router.patch("/:id/public", togglePublic);

router.post("/external", async (req, res) => {
  const { title, year, poster } = req.body;

  if (!title || !year) {
    return res.status(400).json({ message: "Title and year are required" });
  }

  try {
    const movie = await Movie.create({
      title,
      year,
      poster,
      user: req.user._id,
    });

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Failed to add movie" });
  }
});

export default router;
