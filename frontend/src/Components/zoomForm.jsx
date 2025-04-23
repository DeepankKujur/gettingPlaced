import { useState } from "react";
import axios from "axios";

export default function ZoomForm({ application }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    company: "",
  });

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create Zoom meeting
      const res = await axios.post(
        "http://localhost:4000/api/zoom/create-meeting",
        form
      );
      const meetingData = res.data;
      setMeeting(meetingData);

      // Step 2: Send email with nodemailer
      await axios.post("http://localhost:4000/api/invite/interview", {
        to: application.email,
        applicantName: application.name,
        company: form.company,
        date: form.date,
        time: form.time,
        meetingUrl: meetingData.join_url,
      });

      alert("Invitation email sent to applicant.");
    } catch (err) {
      console.error("Zoom or Email Error:", err);
      alert("Error sending meeting or email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Create Zoom Meeting
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Comapany Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Generate Zoom Meeting"}
          </button>
        </form>

        {meeting && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-3">
            <p className="text-sm text-gray-700"> Meeting Created</p>

            <a
              href={meeting.start_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Start Meeting as Host
            </a>

            <p className="text-xs text-gray-500 mt-2">
              This will open in the Zoom App. You can copy the invite link from
              there to send to others manually.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
