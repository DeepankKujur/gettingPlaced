import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewNavbar() {
  const navigateTo = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthorized, user, checkAuth } = useContext(Context);

  const handleLogout = async () => {
    try {
      await axios.get(`https://gettingplaced.onrender.com/api/user/logout`, {
        withCredentials: true,
      });
      await checkAuth(); // Re-check auth state after logout
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleLogin = () => {
    navigateTo("/login"); // Navigate to the login page
  };

  return (
    <nav className="bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <img
            src="/JobZee-logos__white.png"
            className="h-14 md:h-20 cursor-pointer"
            alt="Logo"
          />
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-white md:hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-white items-center text-lg font-medium">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/job/getall" className="hover:underline">
                All Jobs
              </Link>
            </li>
            <li>
              <Link to="/application/me" className="hover:underline">
                {user?.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </Link>
            </li>
            {user?.role === "Employer" && (
              <>
                <li>
                  <Link to="/job/post" className="hover:underline">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/job/me" className="hover:underline">
                    View My Jobs
                  </Link>
                </li>
              </>
            )}
            <li className="mt-4 md:mt-0">
              {isAuthorized ? (
                <button
                  className="bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              ) : (
                <button
                  className="bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
