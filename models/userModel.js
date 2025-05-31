import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
