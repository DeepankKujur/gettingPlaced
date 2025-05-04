import axios from "axios";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation";
import { useLocation } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get("search");
    if (searchFromURL) {
      setSearchTerm(searchFromURL);
    }
  }, [location.search]);

  useEffect(() => {
    axios
      .get(`https://gettingplaced.onrender.com/api/job/getall`, {
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
    <div className="relative w-full min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <BgAnimation />
      </div>

      {/* Heading */}
      <h3 className="text-3xl mb-3 w-full text-center sm:text-4xl lg:text-5xl text-white font-medium italic relative inline-block group">
          <span className="hover-underline">All Available Jobs</span>
          <span className="absolute left-0 -bottom-[8px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
        </h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-fit col-span-1">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Search Jobs
          </h4>
          <input
            type="text"
            placeholder="Search by title, category, country, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Quick Filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Frontend", "Backend", "Design", "Finance", "India"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSearchTerm(filter)}
                    className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm hover:bg-cyan-200 transition"
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        {filteredJobs?.map((element) => (
          <div
            key={element._id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
          >
            <div>
              <p className="text-lg sm:text-xl font-semibold text-amber-400 mb-2 tracking-wide uppercase">
                {element.company}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mb-1">
                {element.title}
              </p>
              <p className="text-base text-purple-300 mb-1">
                {element.category}
              </p>
              <p className="text-sm text-gray-400">{element.country}</p>
            </div>

            <div className="mt-5">
              <Link
                to={`/job/${element._id}`}
                className="block text-center bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-600 transition"
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
