import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Hyderabad, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Delhi-NCR, India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Gurgaon, India ",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center p-12 mt-5 gap-12 text-center">
      <div>
        <h3 className="text-5xl text-white font-medium italic relative inline-block group">
          <span className="hover-underline">Top Companies</span>
          <span className="absolute left-0 -bottom-[16px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
        </h3>
        <div className="flex flex-wrap justify-between gap-10 mt-10">
          {companies.map((element) => {
            return (
              <div
                className="w-[220px] h-[120px] bg-gray-100 dark:bg-gray-800 hover:scale-105 p-5 rounded-lg flex justify-evenly items-center shadow-sm hover:shadow-lg transition-transform duration-100 border border-gray-200 dark:border-gray-700 cursor-pointer"
                key={element.id}
              >
                <div className="text-gray-500 dark:text-gray-400 text-4xl">
                  {element.icon}
                </div>
                <div className="text">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {element.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {element.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
