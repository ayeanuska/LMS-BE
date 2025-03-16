import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    //comes from payload
    bookId: { type: mongoose.Types.ObjectId, ref: "Bokok", required: true },
    borrowDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timeStamp: true,
  }
);

export default BorrowSchema;
