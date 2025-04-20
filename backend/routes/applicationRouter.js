import express from "express";
import {
  employerGetAllApplication,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplication,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/employer/getall", isAuthorized, employerGetAllApplication);
router.get("/jobseeker/getall", isAuthorized, jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);

export default router;
