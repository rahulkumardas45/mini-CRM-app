import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    // Role-based access
    role: {
      type: String,
      enum: ["User", "Admin"], // only allow these roles
      default: "User"
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
