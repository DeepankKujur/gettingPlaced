import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { checkAuth } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password, role },
        { withCredentials: true }
      );
      toast.success(data.message);
      await checkAuth(); // Re-check auth state after login
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex w-full min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h3 className="text-2xl text-white font-semibold mt-4 italic relative inline-block group">
              <span className="hover-underline">Create a new account</span>
              <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-pink-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            </h3>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Login As
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 outline-none text-white bg-black"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-gray-100 ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-300">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none text-white bg-transparent"
                />
                <MdOutlineMailOutline className="text-gray-100 ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-300">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none text-white bg-transparent"
                />
                <RiLock2Fill className="text-gray-100 ml-2" />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-4 text-center me-2 mt-3"
            >
              Login
            </button>
            <Link
              to={"/register"}
              className="block text-center text-blue-500 hover:underline"
            >
              Register Now
            </Link>
          </form>
        </div>
      </div>
      <div
        className="flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url('/login.png')" }}
      ></div>
    </div>
  );
};

export default Login;
