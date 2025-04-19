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
      <div className="myJobs page">
  <div className="container">
    <h3>Your Posted Job</h3>
    {myJobs && myJobs.length > 0 ? (
      <div className="banner">
        {myJobs.map((element) => (
          <div className="card" key={element._id}>
            <div className="content">
              <div className="short_fields">
                <div>
                  <span>Title: </span>
                  <input
                    className="Bold"
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.title}
                    onChange={(e) =>
                      handleInputChange(element._id, "title", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Country: </span>
                  <input
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.country}
                    onChange={(e) =>
                      handleInputChange(element._id, "country", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>City: </span>
                  <input
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.city}
                    onChange={(e) =>
                      handleInputChange(element._id, "city", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Category: </span>
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
                  >
                    <option value="">Select Category</option>
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">
                      Mobile App Development
                    </option>
                    <option value="Frontend Web Development">
                      Frontend Web Development
                    </option>
                    <option value="MERN Stack Development">
                      MERN Stack Development
                    </option>
                    <option value="Account & Finance">Account & Finance</option>
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
                <div>
                  <span>Salary: </span>
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
                    />
                  ) : (
                    <div>
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
                      />
                    </div>
                  )}
                </div>
                <div>
                  <span>Expired: </span>
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
                  >
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                  </select>
                </div>
              </div>
              <div className="long_field">
                <div>
                  <span>Description:</span>
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
                  ></textarea>
                </div>
                <div>
                  <span>Location:</span>
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
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="button_wrapper">
              {editingMode === element._id ? (
                <div className="edit_btn_wrapper">
                  <button
                    onClick={() => handleUpdateJob(element._id)}
                    className="check_btn"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={handelDisableEdit}
                    className="cross_btn"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handelEnableEdit(element._id)}
                  className="edit_btn"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleJobDelete(element._id)}
                className="delete_btn"
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
</div>

    </>
  );
}

export default MyJobs;
