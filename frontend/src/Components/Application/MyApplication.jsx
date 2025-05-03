import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import ResumeModal from "./ResumeModal";
import ZoomForm from "../zoomForm.jsx";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation.jsx";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showZoomForm, setShowZoomForm] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? `https://gettingplaced.onrender.com/api/application/employer/getall`
            : `https://gettingplaced.onrender.com/api/application/jobseeker/getall`;

        const { data } = await axios.get(endpoint, { withCredentials: true });
        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchApplications();
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://gettingplaced.onrender.com/api/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openZoomForm = (application) => {
    setSelectedApplication(application);
    setShowZoomForm(true);
  };

  const closeZoomForm = () => {
    setSelectedApplication(null);
    setShowZoomForm(false);
  };

  const handleInterviewScheduled = (interview) => {
    setApplications((prev) =>
      prev.map((app) =>
        app._id === interview.application
          ? {
              ...app,
              interviewScheduled: true,
            }
          : app
      )
    );
    toast.success("Interview scheduled successfully!");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>
      {user && user.role === "Job Seeker" ? (
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h3 className="text-4xl text-white font-medium mb-10 italic relative inline-block group">
            <span className="hover-underline">My Applications</span>
            <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
          </h3>

          {applications.length <= 0 ? (
            <h4 className="text-center text-white mt-10 text-2xl">
              No Applications Found
            </h4>
          ) : (
            <div className="grid gap-6">
              {applications.map((element) => (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h3 className="text-4xl text-white font-medium mb-10 italic relative inline-block group">
            <span className="hover-underline">
              Applications from job seekers
            </span>
            <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
          </h3>

          {applications.length <= 0 ? (
            <h4 className="text-center text-white mt-10 text-2xl">
              No Applications Found
            </h4>
          ) : (
            <div className="grid gap-6">
              {applications.map((element) => (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                  openZoomForm={openZoomForm}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resume Modal */}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}

      {/* Interview Zoom Form Modal */}
      {showZoomForm && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative p-6 w-full max-w-md mx-4 z-50">
            <button
              onClick={closeZoomForm}
              className="absolute top-8 right-8 bg-red-500 hover:bg-red-600 text-white rounded-xl p-2"
            >
              Close
            </button>
            <ZoomForm application={selectedApplication} />
          </div>
        </div>
      )}
    </div>

  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 space-y-3">
      <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Company:</span>{" "}
          {element.jobId?.company || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Job Title:</span>{" "}
          {element.jobId?.title || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          {element.interviewScheduled ? "Interview Scheduled" : "Under Review"}
        </p>
      </div>

      <div className="flex-shrink-0">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={() => deleteApplication(element._id)}
          className="mt-4 md:mt-0 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Withdraw Application
        </button>
      </div>
    </div>

  );
};

const EmployerCard = ({ element, openModal, openZoomForm }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex-1 space-y-3 text-gray-900 dark:text-gray-100">
        <p>
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {element.email || "Not provided"}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {element.phone || "Not provided"}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {element.address || "Not provided"}
        </p>
      </div>

      {/* Resume Section */}
      {element.resume?.url && (
        <div
          className="w-32 h-40 cursor-pointer overflow-hidden rounded-md shadow-md hover:scale-105 transition-transform"
          onClick={() => openModal(element.resume?.url)}
        >
          <img
            src={element.resume.url}
            alt="Resume"
            className="object-cover w-full h-full bg-green-500"
          />
        </div>
      )}

      <div className="w-full sm:w-auto">
        {element.interviewScheduled && element.zoomHostLink ? (
          <>
            {/* Interview Info Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md mb-4">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Interview Details
              </h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">📅 Date:</span>{" "}
                  {element.interviewDate}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">⏰ Time:</span>{" "}
                  {element.interviewTime}
                </p>
              </div>
            </div>

            {/* Host Button */}
            <a
              href={element.zoomHostLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
            >
              Host Interview
            </a>
          </>
        ) : (
          <button
            onClick={() => openZoomForm(element)}
            className="w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            Invite for Interview
          </button>
        )}
      </div>
    </div>

  );
};

export default MyApplications;
