import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import BgAnimation from "../Layout/BgAnimation";

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

  const handelEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
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
    <div className="w-full min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>
      <h3 className="text-4xl text-white w-[300px] font-medium mb-6 italic relative inline-block group">
        <span className="hover-underline">All Available Jobs</span>
        <span className="absolute left-0 -bottom-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
        <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
      </h3>
      {myJobs && myJobs.length > 0 ? (
        <div className="banner">
          {myJobs.map((element) => (
            <div
              className="bg-blue-200 rounded-lg shadow-2xl overflow-hidden mb-6 border border-gray-300 transition-all hover:shadow-3xl"
              key={element._id}
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      onChange={(e) =>
                        handleInputChange(element._id, "title", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          : "border-transparent bg-white font-medium"
                      }`}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.country}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "country",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      City
                    </label>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.city}
                      onChange={(e) =>
                        handleInputChange(element._id, "city", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <select
                      value={element.category}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "category",
                          e.target.value
                        )
                      }
                      disabled={editingMode !== element._id}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Graphics & Design">
                        Graphics & Design
                      </option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                      <option value="Frontend Web Development">
                        Frontend Web Development
                      </option>
                      <option value="MERN Stack Development">
                        MERN Stack Development
                      </option>
                      <option value="Account & Finance">
                        Account & Finance
                      </option>
                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="Video Animation">Video Animation</option>
                      <option value="MEAN Stack Development">
                        MEAN Stack Development
                      </option>
                      <option value="MEVN Stack Development">
                        MEVN Stack Development
                      </option>
                      <option value="Data Entry Operator">
                        Data Entry Operator
                      </option>
                    </select>
                  </div>

                  {/* Salary */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Salary
                    </label>
                    {element.fixedSalary ? (
                      <input
                        type="number"
                        value={element.fixedSalary}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "fixedSalary",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editingMode === element._id
                            ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            : "border-transparent bg-gray-50"
                        }`}
                      />
                    ) : (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={element.salaryFrom}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryFrom",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                          className={`w-1/2 px-3 py-2 border rounded-md ${
                            editingMode === element._id
                              ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              : "border-transparent bg-gray-50"
                          }`}
                          placeholder="From"
                        />
                        <input
                          type="number"
                          value={element.salaryTo}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "salaryTo",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                          className={`w-1/2 px-3 py-2 border rounded-md ${
                            editingMode === element._id
                              ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              : "border-transparent bg-gray-50"
                          }`}
                          placeholder="To"
                        />
                      </div>
                    )}
                  </div>

                  {/* Expired */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Expired
                    </label>
                    <select
                      value={element.expired}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expired",
                          e.target.value
                        )
                      }
                      disabled={editingMode !== element._id}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                </div>

                {/* Description and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      rows={5}
                      value={element.description}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "description",
                          e.target.value
                        )
                      }
                      disabled={editingMode !== element._id}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <textarea
                      rows={5}
                      value={element.location}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "location",
                          e.target.value
                        )
                      }
                      disabled={editingMode !== element._id}
                      className={`w-full px-3 py-2 border rounded-md ${
                        editingMode === element._id
                          ? "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          : "border-transparent bg-gray-50"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-4 border-t border-gray-100 p-4">
                {editingMode === element._id ? (
                  <div className="flex space-x-2">
                    {/* Save Button */}
                    <button
                      onClick={() => handleUpdateJob(element._id)}
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      title="Save Changes"
                    >
                      <FaCheck className="mr-1" />
                      <span>Save</span>
                    </button>

                    {/* Cancel Button */}
                    <button
                      onClick={handelDisableEdit}
                      className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      title="Cancel Editing"
                    >
                      <RxCross2 className="mr-1" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  /* Edit Button */
                  <button
                    onClick={() => handelEnableEdit(element._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    title="Edit Job"
                  >
                    Edit
                  </button>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleJobDelete(element._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  title="Delete Job"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You've not posted any job or may be you deleted all jobs!</p>
      )}
    </div>
  );
}

export default MyJobs;
