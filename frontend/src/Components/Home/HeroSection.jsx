import React, { useContext } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthorized } = useContext(Context);

  const details = [
    { id: 1, title: "1,23,441", subTitle: "Live Job", icon: <FaSuitcase /> },
    { id: 2, title: "91220", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "2,34,200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "1,03,761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  return (
    <div className="flex flex-col py-[75px] px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row w-full px-10 mb-7 min-h-[450px] relative">
        <div className="flex flex-col justify-center flex-1 z-10 text-white lg:text-left text-center">
          <h1 className="text-4xl md:text-5xl italic font-bold max-w-[600px] mx-auto lg:mx-0">
            Find a job that suits your interests and skills
          </h1>
          <p className="mt-6 h-[110px] max-w-[600px] mx-auto lg:mx-0 text-base md:text-lg text-gray-200">
            <Typewriter
              words={[
                "Discover job opportunities that truly match your passion. From freshers to experienced professionals, we've got you covered. Take the next step in your career — smart, simple, and fast.",
              ]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              delaySpeed={2000}
            />
          </p>
          {!isAuthorized && (
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-4 py-2 text-center me-2 mt-3 w-24 "
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        {/* Image */}
        <div className="flex-1 relative overflow-hidden">
          <img
            src="/heroS.jpg"
            alt="hero"
            className="w-full h-full object-cover lg:static lg:opacity-100"
          />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-wrap gap-4 justify-between w-full p-12 mx-auto">
        {details.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 w-[250px] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-shadow hover:shadow-md"
          >
            <div className="text-2xl p-3 bg-blue-100 text-green-800 rounded-full">
              {item.icon}
            </div>
            <div>
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
