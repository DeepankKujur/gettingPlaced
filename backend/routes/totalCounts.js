import express from "express";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [jobSeekers, employers, jobs,companies] = await Promise.all([
      User.countDocuments({ role: "Job Seeker" }),
      User.countDocuments({ role: "Employer" }),
      Job.countDocuments({expired: false}),
      Job.distinct("company").then((companies) => companies.length),
    ]);

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
