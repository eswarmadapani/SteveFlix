import mongoose from "mongoose";

const savedMovieSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mediaId: {
      type: Number,
      required: true
    },
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    posterPath: {
      type: String
    },
    releaseDate: {
      type: String
    },
    rating: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const SavedMovie = mongoose.model("SavedMovie", savedMovieSchema);

export default SavedMovie;
