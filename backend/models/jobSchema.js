import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must contain at least 3 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [3, "description must contain at least 3 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide Job category"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location"],
    minLength: [20, "Job location must contain at least 20 characters."],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Fixed Salary must be at least 4 digits"],
    max: [999999999, "Fixed Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary From must be at least 4 digits"],
    max: [999999999, "Salary From cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary To must be at least 4 digits"],
    max: [999999999, "Salary To cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
