import axios from "axios";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error.response || error.message);
      });
  }, []);

  const filteredJobs = jobs.jobs?.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.category.toLowerCase().includes(term) ||
      job.country.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <BgAnimation />
      </div>

      {/* Heading */}
      <h3 className="text-4xl text-black font-medium mb-6 italic text-center">
        All Available Jobs
      </h3>

      {/* Grid layout including search + jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        {/* Search box as a card */}
        <div className="bg-white rounded-xl shadow-md p-4 h-fit">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Search Jobs</h4>
          <input
            type="text"
            placeholder="Search by title, category, country, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Filter list */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters:</p>
            <div className="flex flex-wrap gap-2">
              {['Frontend', 'Backend', 'Design', 'Finance', 'India'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchTerm(filter)}
                  className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm hover:bg-cyan-200 transition"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Job cards */}
        {filteredJobs?.map((element) => (
          <div
            key={element._id}
            className="bg-gray-800 shadow-md rounded-lg p-5 flex flex-col justify-between h-60"
          >
            <div>
            <p className="text-3xl font-semibold text-gray-300  text-center truncate"><span className="text-blue-400">{element.company}</span></p>
              <p className="text-2xl font-semibold text-gray-100  truncate mb-1">{element.title}</p>
              <p className="text-xl text-white truncate mb-2">{element.category}</p>
              <p className="text-md text-white truncate mb-3">{element.country}</p>
             
            </div>

            <div className="flex justify-center mt-3">
              <Link
                to={`/job/${element._id}`}
                className="bg-cyan-500 text-white px-5 py-3 rounded-md text-xs hover:bg-cyan-600 transition font-medium"
              >
                View Job Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
