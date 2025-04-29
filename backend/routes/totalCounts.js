import express from "express";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [jobSeekers, employers, jobs] = await Promise.all([
      User.countDocuments({ role: "Job Seeker" }),
      User.countDocuments({ role: "Employer" }),
      Job.countDocuments(),
    ]);

    // Assuming companies are inferred from the number of employers
    const companies = employers;

    res.json({
      jobSeekers,
      employers,
      liveJobs: jobs,
      companies,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err });
  }
});

export default router;
