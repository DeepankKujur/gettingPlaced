// routes/invite.js
import express from "express";
import { sendInterviewEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/interview", async (req, res) => {
  try {
    await sendInterviewEmail(req.body);
    res.status(200).json({ message: "Interview invitation sent successfully." });
  } catch (error) {
    console.error("Failed to send invite:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

export default router;
