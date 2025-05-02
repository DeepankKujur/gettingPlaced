import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaRegUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Use the navigate hook

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // if(isAuthorized){
  //   return <Navigate to={'/'}/>
  // }

  return (
    <div className="flex w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl text-white font-semibold mt-4 italic relative inline-block group">
              <span className="hover-underline">Create a new account</span>
              <span className="absolute left-0 -bottom-[5px] w-full h-[2px] bg-gradient-to-r from-pink-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
            </h3>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Register As
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 text-white bg-black outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-white ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <FaPencilAlt className="text-white ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <MdOutlineMailOutline className="text-white ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <input
                  type="number"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <FaPhoneFlip className="text-white ml-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-500 rounded-md p-2">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none"
                />
                <RiLock2Fill className="text-white ml-2" />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              className="w-full py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-4 text-center me-2 mt-3"
            >
              Register
            </button>
            <Link
              to={"/login"}
              className="block text-center text-blue-400 hover:underline"
            >
              Login Now
            </Link>
          </form>
        </div>
      </div>
      <div
        className="flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url('/register.png')" }}
      ></div>
    </div>
  );
};

export default Register;
