// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendInterviewEmail({
  to,
  applicantName,
  company,
  date,
  time,
  meetingUrl,
}) {
  const match = meetingUrl.match(/\/j\/(\d+)\?pwd=([\w.]+)/);
  const meetingId = match?.[1] || "Unavailable";
  const passcode = match?.[2] || "Unavailable";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${company} HR Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Interview Invitation from ${company}`,
    html: `
      <p>Dear ${applicantName},</p>

      <p>We are pleased to invite you for an interview at <strong>${company}</strong>.</p>

      <p><strong>Interview Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Platform:</strong> Zoom</li>
        <li><strong>Meeting ID:</strong> ${meetingId}</li>
        <li><strong>Passcode:</strong> ${passcode}</li>
      </ul>

      <p>Please join a few minutes early and ensure your internet connection and environment are suitable for the interview.</p>

      <p>If you have any questions or need to reschedule, feel free to reach out.</p>

      <p>Looking forward to meeting you.<br/><br/>Best regards,<br/>${company} Recruitment Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
