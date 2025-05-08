import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    expires: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 36000000000), //1 hr
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SessionSchema = mongoose.model("Session", sessionSchema);
export default SessionSchema;
