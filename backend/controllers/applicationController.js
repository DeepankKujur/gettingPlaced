import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

//getting applications to the employer
export const employerGetAllApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seeker is not allowed to access this resource",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer is not allowed to access this resource", 400)
      );
    }
    const applications = await Application.find({
      "applicantID.user": req.user._id,
    }).populate("jobId");

    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer is not allowed to access this resource", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to access this resource", 400)
    );
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume file required", 400));
  }
  const { resume } = req.files;
  //cloudinary doesn't show .pdf formate in frontend so resume formate im using will be .png
  const allowedFormats = ["image/png", "image/jpg", "image/webp"];

  if (!allowedFormats.includes(resume.mimetype)) {
    //mimetype means jpg png etc like that thing
    return next(
      new ErrorHandler(
        "Invalid file type, Please upload your resume in a PNG, JPG or WEBP format",
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown cloudinary Error"
    );
    return next(new ErrorHandler("Failed to upload resume", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body; //jobId is to check if this job even exist or not
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    jobId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted",
    application,
  });
});

export const statusIsInterviewScheduled = catchAsyncError(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  application.interviewScheduled = true;
  await application.save();

  res.status(200).json({ message: "Interview status updated." });
});

export const updateApplicationZoomDetails = async (req, res) => {
  const { id } = req.params;
  const { interviewScheduled, interviewDate, interviewTime, zoomHostLink } =
    req.body;

  try {
    const updated = await Application.findByIdAndUpdate(
      id,
      { interviewScheduled, interviewDate, interviewTime, zoomHostLink },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Application not found" });

    res
      .status(200)
      .json({ message: "Application updated", application: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
