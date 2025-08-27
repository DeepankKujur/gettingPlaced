import axios from "axios";
import { useState } from "react";

export default function ZoomForm({ application }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    company: "",
  });
  const [error, setError] = useState(""); // Error state for better error handling
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Success state for confirmation
  const todayDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPastTime()) {
      alert("Please select a future time.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      //Create Zoom meeting
      const res = await axios.post(
        `https://gettingplaced.onrender.com/api/zoom/create-meeting`,
        form,
        { withCredentials: true }
      );
      const meetingData = res.data;
      setMeeting(meetingData);

      //Send interview email
      await axios.post(
        `https://gettingplaced.onrender.com/api/invite/interview`,
        {
          to: application.email,
          applicantName: application.name,
          company: form.company,
          date: form.date,
          time: form.time,
          meetingUrl: meetingData.join_url,
        },
        { withCredentials: true }
      );

      //Update application status
      await axios.patch(
        `https://gettingplaced.onrender.com/api/application/status/${
          application._id
        }`,
        {},
        { withCredentials: true }
      );

      //Update application with interview info
      await axios.patch(
        `https://gettingplaced.onrender.com/api/application/update/${
          application._id
        }`,
        {
          interviewScheduled: true,
          interviewDate: form.date.split("-").reverse().join("-"), // Convert yyyy-mm-dd to dd-mm-yyyy
          interviewTime: form.time,
          zoomHostLink: meetingData.start_url,
        },
        { withCredentials: true }
      );

      setSuccess(true);
      alert("Invitation email sent to applicant.");
    } catch (err) {
      console.error("Zoom or Email Error:", err);
      setError("Error sending Zoom meeting or email.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setForm({ ...form, date: e.target.value, time: "" }); // Reset time when date changes
  };

  const handleTimeChange = (e) => {
    setForm({ ...form, time: e.target.value });
  };

  const isPastTime = () => {
    if (form.date !== todayDate) return false; // Only validate time if it's today

    const now = new Date();
    const [hours, minutes] = form.time.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    return selectedTime < now;
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Create Zoom Meeting
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Input */}
        <label className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <input
          type="date"
          value={form.date}
          min={todayDate}
          onChange={handleDateChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Time Input */}
        <label className="block text-sm font-medium text-gray-700">
          Select Time
        </label>
        <input
          type="time"
          value={form.time}
          onChange={handleTimeChange}
          required
          disabled={!form.date}
          className={`w-full border ${
            isPastTime() ? "border-red-400" : "border-gray-300"
          } rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            !form.date ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
        {isPastTime() && (
          <p className="text-red-500 text-xs mt-1">
            Please select a future time.
          </p>
        )}

        {/* Company Input */}
        <label className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || isPastTime()}
          className={`w-full py-2 rounded-lg font-medium transition text-white ${
            loading || isPastTime()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Generate Zoom Meeting"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-3">
          <p className="text-sm text-gray-700">
            ✅ Meeting Created Successfully
          </p>

          <a
            href={meeting.start_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Start Meeting as Host
          </a>

          <p className="text-xs text-gray-500 mt-2">
            This opens in the Zoom App. Copy the invite link there to share.
          </p>
        </div>
      )}
    </div>
  );
}
