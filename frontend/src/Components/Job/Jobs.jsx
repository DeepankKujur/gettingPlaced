import axios from "axios";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import BgAnimation from "../Layout/BgAnimation";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
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

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>
      <h3 className="text-4xl text-white font-medium mb-6 italic relative inline-block group">
        <span className="hover-underline">All Available Jobs</span>
        <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
        <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
      </h3>
      <div className="banner">
        {jobs.jobs &&
          jobs.jobs.map((element) => {
            return (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Jobs;
