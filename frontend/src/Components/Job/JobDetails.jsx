import axios from "axios";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation";

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
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>

      <h3 className="text-4xl text-white font-medium mb-10 italic relative inline-block group">
        <span className="hover-underline">All Available Jobs</span>
        <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
        <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
      </h3>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-100 rounded-xl shadow-lg p-8 space-y-6 text-gray-900">
          <p>
            <span className="font-semibold">Title:</span> {job.title}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {job.category}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {job.country}
          </p>
          <p>
            <span className="font-semibold">City:</span> {job.city}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {job.description}
          </p>
          <p>
            <span className="font-semibold">Job Posted On:</span>{" "}
            {job.jobPostedOn}
          </p>
          <p>
            <span className="font-semibold">Salary:</span>{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {/* Apply Now Button */}
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="pt-4">
              <Link
                to={`/application/${job._id}`}
                className="inline-block w-full text-center text-white bg-blue-600 py-3 rounded-md hover:scale-105 transition-transform font-semibold"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
