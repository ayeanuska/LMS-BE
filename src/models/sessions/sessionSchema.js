import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SessionSchema = mongoose.model("Session", sessionSchema);
export default SessionSchema;
