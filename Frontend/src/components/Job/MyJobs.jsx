import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  // Fatching all jobs of an employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/job/myjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // function for enabling editing mode
  const handelEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  // function for disabling editing mode
  const handelDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // function for editing job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id == jobId);
    await axios
      .put(`http://localhost:4000/api/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  // function for deleting job
  const handleJobDelete = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // jobs ko filter krliya ki koi bhi job ki id wo na ho jo humne pass kri function me, or baki sari jobs ko as a array set krdega
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // function of input change
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job._id === jobId) {
          // Update the field of the job
          return { ...job, [field]: value };
        }
        return job; // Keep the rest unchanged
      });
    });
  };

  return (
    <>
      
    </>
  )
}
