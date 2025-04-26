import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data.jobs || []);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error.response || error.message);
      });
  }, []);

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

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Category: {job.category}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Country: {job.country}
                </p>
              </div>
              <Link
                to={`/job/${job._id}`}
                className="text-center mt-4 text-white bg-blue-400 px-4 py-2 rounded-md hover:scale-105 transition-transform"
              >
                View Job Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-white mt-10 text-lg">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
