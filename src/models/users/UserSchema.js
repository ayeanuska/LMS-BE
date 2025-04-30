import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  status: { type: String, default: "inactive" },
  role: { type: String, enum: ["admin", "student"], default: "student" },

  phone: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    unique: true,
    index: 1,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  refreshJWT: {
    type: String,
    default: "",
  },
});

export default mongoose.model("user", userSchema);
