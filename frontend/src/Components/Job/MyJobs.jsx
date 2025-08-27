import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import BgAnimation from "../Layout/BgAnimation";
import { useContext, useEffect, useState } from "react";

function MyJobs() {
  const navigateTo = useNavigate();
  const [myJobs, setMyJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const [editingMode, setEditingMode] = useState(null);

  // Fetching all jobs of an employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `https://gettingplaced.onrender.com/api/job/myjobs`,
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
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(
        `https://gettingplaced.onrender.com/api/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
        }
      )
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
      .delete(`https://gettingplaced.onrender.com/api/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
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
          return { ...job, [field]: value };
        }
        return job;
      });
    });
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        {/* Full-screen background animation */}
        <div className="absolute top-0 left-0 h-full w-full -z-10">
          <BgAnimation />
        </div>

        <div className="container w-full h-full max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Your Posted Jobs
          </h3>
          {myJobs && myJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((element) => (
                <div
                  className="card bg-gray-100 rounded-lg shadow-md p-6"
                  key={element._id}
                >
                  <div className="content space-y-4">
                    <div className="short_fields grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <span className="font-semibold">Title: </span>
                        <input
                          className="w-full border border-gray-600 p-2 rounded-md"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span className="font-semibold">Country: </span>
                        <input
                          className="w-full border border-gray-600 p-2 rounded-md"
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
                        />
                      </div>
                      <div>
                        <span className="font-semibold">Company: </span>
                        <input
                          className="w-full border border-gray-600 p-2 rounded-md"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.company}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "company",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span className="font-semibold">City: </span>
                        <input
                          className="w-full border border-gray-600 p-2 rounded-md"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span className="font-semibold">Category: </span>
                        <select
                          className="w-full border border-gray-600 p-2 rounded-md"
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
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
                          <option value="Video Animation">
                            Video Animation
                          </option>
                          <option value="MEVN Stack Development">
                            MERN Stack Development
                          </option>
                          <option value="Data Entry Operator">
                            Data Entry Operator
                          </option>
                        </select>
                      </div>
                      <div>
                        <span className="font-semibold">Salary: </span>
                        {element.fixedSalary ? (
                          <input
                            className="w-full border border-gray-600 p-2 rounded-md"
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
                          />
                        ) : (
                          <div className="flex gap-2">
                            <input
                              className="w-1/2 border border-gray-600 p-2 rounded-md"
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
                            />
                            <input
                              className="w-1/2 border border-gray-600 p-2 rounded-md"
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
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold">Expired: </span>
                        <select
                          className="w-full border border-gray-600 p-2 bg-gray-100 text-gray-800 rounded-md"
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "expired",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>

                    <div className="long_field grid gap-4 mt-4 md:grid-cols-2">
                      <div>
                        <span className="font-semibold">Description:</span>
                        <textarea
                          className="w-full p-2 border border-gray-600 rounded-md"
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
                        ></textarea>
                      </div>
                      <div>
                        <span className="font-semibold">Location:</span>
                        <textarea
                          className="w-full p-2 border border-gray-600 rounded-md"
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
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="button_wrapper flex justify-end mt-4 gap-3">
                    {editingMode === element._id ? (
                      <div className="edit_btn_wrapper flex gap-2">
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handelDisableEdit}
                          className="cross_btn bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handelEnableEdit(element._id)}
                        className="edit_btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleJobDelete(element._id)}
                      className="delete_btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">
              You've not posted any job or maybe you deleted all jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
