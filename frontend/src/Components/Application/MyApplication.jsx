import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import ResumeModal from "./ResumeModal";
import ZoomForm from "../ZoomForm.jsx";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

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
            ? "http://localhost:4000/api/application/employer/getall"
            : "http://localhost:4000/api/application/jobseeker/getall";

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
        `http://localhost:4000/api/application/delete/${id}`,
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
              employerID: { ...app.employerID, interviewScheduled: true },
            }
          : app
      )
    );
    toast.success("Interview scheduled successfully!");
  };

  return (
    <div className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h3>Applications from Job Seekers</h3>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
                openZoomForm={openZoomForm}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
      {showZoomForm && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={closeZoomForm}
              className="absolute top-0 right-0 m-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm hover:bg-red-600"
            >
              ✕
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
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Job Title:</span> {element.job?.title || "N/A"}
        </p>
        <p>
          <span>Status:</span>{" "}
          {element.employerID?.interviewScheduled
            ? "Interview Scheduled"
            : "Under Review"}
        </p>
        <p>
          <span>Applied On:</span>{" "}
          {new Date(element.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Withdraw Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal, openZoomForm }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email || "Not provided"}
        </p>
        <p>
          <span>Phone:</span> {element.phone || "Not provided"}
        </p>
        <p>
          <span>Address:</span> {element.address || "Not provided"}
        </p>
      </div>

      <div className="resume">
        <img
          src={element.resume?.url}
          alt="resume"
          onClick={() => openModal(element.resume?.url)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="btn_area">
        <button
          onClick={() => openZoomForm(element)}
          className={`px-4 py-2 rounded text-white ${
            element.employerID?.interviewScheduled
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {element.employerID?.interviewScheduled
            ? "View Interview"
            : "Invite for Interview"}
        </button>
      </div>
    </div>
  );
};


export default MyApplications;
