import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewNavbar() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const handleLogin = () => {
    navigateTo("/login"); // Navigate to the login page
  };
  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto w-full px-4 py-3">
          <Link to={"/"}>
            <img
              src="/JobZee-logos__white.png"
              className="h-20 cursor-pointer"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center space-x-10 rtl:space-x-reverse">
            <ul className="flex flex-row font-medium mt-0 space-x-4 rtl:space-x-reverse text-xl">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-900 dark:text-white hover:underline cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/job/getall"}
                  className="text-gray-900 dark:text-white hover:underline cursor-pointer"
                >
                  All Jobs
                </Link>
              </li>
              <li>
                <Link
                  to={"/application/me"}
                  className="text-gray-900 dark:text-white hover:underline cursor-pointer"
                >
                  {user && user.role === "Employer"
                    ? "Applicant's Applications"
                    : "My Applications"}
                </Link>
              </li>
              {user && user.role === "Employer" ? (
                <>
                  <li>
                    <Link
                      to={"/job/post"}
                      className="text-gray-900 dark:text-white hover:underline cursor-pointer"
                    >
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/job/me"}
                      className="text-gray-900 dark:text-white hover:underline cursor-pointer"
                    >
                      View My Jobs
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>

            {isAuthorized ? (
              <button
                className="relative inline-flex items-center justify-center p-0.5 cursor-pointer me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                onClick={handleLogout}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  LOGOUT
                </span>
              </button>
            ) : (
              <button
                className="relative inline-flex items-center justify-center p-0.5 cursor-pointer me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                onClick={handleLogin}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  LOGIN
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
