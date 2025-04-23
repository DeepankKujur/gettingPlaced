import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout); //by isAuthorized...if there no token present to the user means not logged in then how can he log out..will lead to "user not authorized"
router.get("/getuser", isAuthorized, getUser);
// Public endpoint that doesn't require auth
router.get("/public/getuser", async (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(200).json({ 
      success: true,
      user: null 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    res.status(200).json({ 
      success: true,
      user 
    });
  } catch (error) {
    res.status(200).json({ 
      success: true,
      user: null 
    });
  }
});

export default router;
