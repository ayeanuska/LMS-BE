import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    isbn: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    publishedYear: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },

    availabiliy: {
      type: Boolean,
      default: true,
    },
    expectedAvailable: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("book", BookSchema);
