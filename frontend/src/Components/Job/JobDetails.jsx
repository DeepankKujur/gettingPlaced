import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page bg-gradient-to-br from-gray-900 to-black text-white py-10 px-6 sm:px-8">
      <div className="container max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h3 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 border-b border-cyan-500 pb-3">
          Job Details
        </h3>
        <div className="banner space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Title: </span>
            <span>{job.title}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Category: </span>
            <span>{job.category}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Company: </span>
            <span>{job.company}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Country: </span>
            <span>{job.country}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">City: </span>
            <span>{job.city}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Location: </span>
            <span>{job.location}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Description: </span>
            <span>{job.description}</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Job Posted On: </span>
            <span>{job.jobPostedOn}</span>
          </p>

          <div className="text-lg flex flex-wrap items-center justify-between">
            <div>
              <span className="font-semibold">Salary: </span>
              {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </div>

            {user && user.role !== "Employer" && (
              <Link
                to={`/application/${job._id}`}
                className="mt-2 sm:mt-0 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>

  );
};

export default JobDetails;
