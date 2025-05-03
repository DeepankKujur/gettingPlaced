import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

//user- login logout register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(
      new ErrorHandler("Please fill all the details in registration form")
    );
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exist"));
  }
  //else
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  sendToken(user, 200, res, "User Registered Successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email ,password and role", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  //.select("+password") this will get the password cuz email find se pwd fetch nhi hopaega userSchema me select:false likha hai
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  sendToken(user, 200, res, "User logged in successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
  //delete the cookie
  res
    .status(201)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

//details of user logged in
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
