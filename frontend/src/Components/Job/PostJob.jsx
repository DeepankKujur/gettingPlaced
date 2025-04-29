import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import BgAnimation from "../Layout/BgAnimation";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [showDropdown, setShowDropdown] = useState(false);
  const categoryRef = useRef(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const categoryOptions = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "Data Entry Operator",
  ];

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/job/post",
        fixedSalary.length >= 4
          ? {
            title,
            description,
            company,
            category,
            country,
            city,
            location,
            fixedSalary,
          }
          : {
            title,
            description,
            company,
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
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>

      <div className="w-full max-w-4xl mx-auto text-white  p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-100">POST NEW JOB</h3>

        <form onSubmit={handleJobPost} className="space-y-6">
          {/* Title & Category */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[45%]">
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
              />
            </div>

            <div className="flex-1 min-w-[45%] relative" ref={categoryRef}>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border bg-gray-900 border-gray-300 text-white rounded-md pr-10"
                placeholder="Select or type category"
                onFocus={() => setShowDropdown(true)}
              />
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="absolute top-9 right-3 text-white hover:text-gray-700"
              >
                ▼
              </button>
              {showDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-gray-900 text-white border border-gray-300 rounded-md shadow max-h-48 overflow-y-auto">
                  {categoryOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setCategory(option);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-500"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Country & City */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[45%]">
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border text-white bg-gray-900 border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1 min-w-[45%]">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border text-white bg-gray-900 border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
              placeholder="min length 20"
            />
          </div>
          <div className="flex-1 min-w-[45%]">
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
              placeholder="Company Name"
            />
          </div>

          {/* Salary Type */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Salary Type</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="w-full p-3 border text-white  bg-gray-900 border-gray-300 rounded-md"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              {salaryType === "default" && (
                <p className="text-sm text-red-500 mt-1">Please provide Salary Type *</p>
              )}
            </div>

            {salaryType === "Fixed Salary" && (
              <div>
                <label className="block text-sm font-medium mb-1">Fixed Salary</label>
                <input
                  type="number"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
                  placeholder="Enter Fixed Salary"
                />
              </div>
            )}

            {salaryType === "Ranged Salary" && (
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[45%]">
                  <label className="block text-sm font-medium mb-1">Salary From</label>
                  <input
                    type="number"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-[45%]">
                  <label className="block text-sm font-medium mb-1">Salary To</label>
                  <input
                    type="number"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className="w-full p-3 border bg-gray-900 text-white border-gray-300 rounded-md resize-y"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>

  );
};

export default PostJob;
