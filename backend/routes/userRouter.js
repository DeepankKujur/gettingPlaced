import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout); //by isAuthorized...if there no token present to the user means not logged in then how can he log out..will lead to "user not authorized"
router.get("/getuser", isAuthorized, getUser);

export default router;
