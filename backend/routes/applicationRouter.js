import express from "express";
import {
  employerGetAllApplication,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplication,
  postApplication,
  statusIsInterviewScheduled,
  updateApplicationZoomDetails,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/employer/getall", isAuthorized, employerGetAllApplication);
router.get("/jobseeker/getall", isAuthorized, jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);
router.patch("/status/:id", isAuthorized, statusIsInterviewScheduled);
router.patch("/update/:id", updateApplicationZoomDetails);

export default router;
