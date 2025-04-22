import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },

    bookId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    burrowId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userId: { type: mongoose.Types.ObjectId, required: true },
    useName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
