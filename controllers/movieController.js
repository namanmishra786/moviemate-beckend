import Movie from "../models/Movie.js";
import User from "../models/User.js";

// ➕ Add a new movie
export const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie({
      ...req.body,
      user: req.user._id,
    });
    const saved = await newMovie.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📥 Get all movies for this user
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user._id });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update movie
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete movie
export const deleteMovie = async (req, res) => {
  try {
    await Movie.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🌐 ✅ Public movies for a single user (only public)
export const getPublicMovies = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movies = await Movie.find({ user: user._id, public: true });
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🌍 ✅ New: get ALL public movies for the feed
export const getAllPublicMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ public: true }).populate("user", "username");
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ PATCH only the public flag
export const togglePublic = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { public: req.body.public },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

