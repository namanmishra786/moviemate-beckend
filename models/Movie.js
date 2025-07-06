import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  title: { type: String, required: true },
  poster: { type: String },
  year: { type: String },
  description: { type: String },
  watched: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 10 },
  review: { type: String },
  public: { type: Boolean, default: false }, // ✅ Add this line
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
