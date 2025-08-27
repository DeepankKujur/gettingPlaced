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
  const [loading, setLoading] = useState(true);
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
            ? `${
                import.meta.env.VITE_BACKEND_URL
              }/api/application/employer/getall`
            : `${
                import.meta.env.VITE_BACKEND_URL
              }/api/application/jobseeker/getall`;

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="absolute top-0 left-0 h-full w-full -z-10">
          <BgAnimation />
        </div>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>

      {user && user.role === "Job Seeker" ? (
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl text-white font-medium mb-8 sm:mb-10 italic relative inline-block group text-center">
            <span className="hover-underline">My Applications</span>
            <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
          </h3>

          {applications.length <= 0 ? (
            <h4 className="text-center text-white mt-10 text-xl sm:text-2xl">
              No Applications Found
            </h4>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-2">
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
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl text-white font-medium mb-8 sm:mb-10 italic relative inline-block group text-center">
            <span className="hover-underline">
              Applications from job seekers
            </span>
            <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
          </h3>

          {applications.length <= 0 ? (
            <h4 className="text-center text-white mt-10 text-xl sm:text-2xl">
              No Applications Found
            </h4>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-2">
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

      {/* Zoom Form Modal */}
      {showZoomForm && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative p-6 w-full max-w-md mx-4 z-50 bg-white rounded-xl shadow-lg">
            <button
              onClick={closeZoomForm}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-xl p-2"
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
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 w-full">
      <div className="flex-1 space-y-2 text-left w-full">
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold text-gray-900">Company:</span>{" "}
          {element.jobId?.company || "N/A"}
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold text-gray-900">Job Title:</span>{" "}
          {element.jobId?.title || "N/A"}
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          <span
            className={
              element.interviewScheduled ? "text-green-500" : "text-gray-600"
            }
          >
            {element.interviewScheduled
              ? "Interview Scheduled"
              : "Under Review"}
          </span>
        </p>
      </div>

      <div className="flex justify-center md:justify-end">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      <div className="w-full md:w-auto text-center md:text-right">
        <button
          onClick={() => deleteApplication(element._id)}
          className="mt-4 md:mt-0 w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal, openZoomForm }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 w-full">
      <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left: Info */}
        <div className="w-[60%] space-y-3 text-gray-900 dark:text-gray-100 text-sm ">
          <p className="truncate">
            <span className="font-semibold">Name:</span> {element.name}
          </p>
          <p className="truncate">
            <span className="font-semibold">Email:</span>{" "}
            {element.email || "N/A"}
          </p>
          <p className="truncate">
            <span className="font-semibold">Phone:</span>{" "}
            {element.phone || "N/A"}
          </p>
          <p className="break-words">
            <span className="font-semibold">Address:</span>{" "}
            {element.address || "N/A"}
          </p>
        </div>

        {/* Middle: Resume Preview */}
        <div className="flex justify-center lg:justify-start">
          {element.resume?.url ? (
            <div
              className="w-24 h-32 mx-auto cursor-pointer overflow-hidden rounded-lg shadow-md bg-gray-200 flex items-center justify-center hover:scale-105 transition-transform"
              onClick={() => openModal(element.resume.url)}
            >
              <img
                src={element.resume.url}
                alt="Resume"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-24 h-32 mx-auto overflow-hidden rounded-lg shadow-md bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">
                No Resume
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Interview Panel */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 w-full">
        {element.interviewScheduled && element.zoomHostLink ? (
          <>
            <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Interview Details
              </h3>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {element.interviewDate}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {element.interviewTime}
                </p>
              </div>
            </div>
            <a
              href={element.zoomHostLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              Host Interview
            </a>
          </>
        ) : (
          <button
            onClick={() => openZoomForm(element)}
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
          >
            Invite for Interview
          </button>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
