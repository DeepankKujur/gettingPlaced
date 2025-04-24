import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      minLength: [3, "Name must contain at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Invalid email"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [8, "Password must be atleast 8 characters"],
      select: false, //response me password show nhi hoga while GET method
    },
    role: {
      type: String,
      required: [true, "Please provide your role"],
      enum: ["Job Seeker", "Employer"],
    },
  },
  { timestamps: true }
);

//hashing the password
userSchema.pre("save", async function (next) {
  //before saving userSchema run async fn
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//comparing password
userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

//jwt token generate for authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    // id ko _id krke dekh lena ek baar
    expiresIn: process.env.JWT_EXPIRE,
  });
};
export const User = mongoose.model("User", userSchema);
