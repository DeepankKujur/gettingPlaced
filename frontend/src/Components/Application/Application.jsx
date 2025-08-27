import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BgAnimation from "../Layout/BgAnimation";

function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );

      setName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("");
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>

      <div className="text-center">
        <h3 className="text-4xl text-white font-medium mb-10 italic relative inline-block group">
          <span className="hover-underline">Apply here</span>
          <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
        </h3>
      </div>

      <div className="container w-full mx-auto bg-white max-w-lg p-6 sm:p-8 rounded-2xl shadow-md">
        <form onSubmit={handleApplication} className="space-y-6">
          <input
            type="text"
            value={id}
            readOnly
            className="w-full break-words p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Cover Letter"
            rows="5"
            className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="block text-lg font-medium mb-2">
              Select Resume (.jpg, .png, .webp)
            </label>
            <input
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Application;
