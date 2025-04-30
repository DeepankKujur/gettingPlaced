import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import BgAnimation from "../Layout/BgAnimation";
import React, { useContext, useState } from "react";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    await axios
      .post(
        "http://localhost:4000/api/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary("");
        setSalaryType("default");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

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
      <form
        onSubmit={handleJobPost}
        className="rounded-lg text-white p-6 max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-white text-lg font-medium mb-2"
              htmlFor="title"
            >
              Job Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior React Developer"
              className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              className="block text-white text-lg font-medium mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
  list="categories"
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  placeholder="Select or type category"
  className="w-full bg-gray-900 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
/>

<datalist id="categories">
  <option value="Graphics & Design" />
  <option value="Mobile App Development" />
  <option value="Frontend Web Development" />
  <option value="MERN Stack Development" />
  <option value="Account & Finance" />
  <option value="Artificial Intelligence" />
  <option value="Video Animation" />
  <option value="MEAN Stack Development" />
  <option value="MEVN Stack Development" />
  <option value="Data Entry Operator" />
</datalist>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-white text-lg font-medium mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United States"
              className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              className="block text-white text-lg font-medium mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. New York"
              className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-white text-lg font-medium mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Remote, Office Address, etc."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-lg font-medium mb-2">
            Salary Information
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>

            <div>
              {salaryType === "default" ? (
                <p className="text-white mt-2 text-lg italic">
                  Please select salary type first
                </p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-white text-lg font-medium mb-2"
            htmlFor="description"
          >
            Job Description
          </label>
          <textarea
            id="description"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job responsibilities, requirements, and benefits..."
            className="w-full px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-4 py-2 text-center me-2 mt-3 w-full "
        >
          Create Job Posting
        </button>
      </form>
    </div>
  );
};

export default PostJob;