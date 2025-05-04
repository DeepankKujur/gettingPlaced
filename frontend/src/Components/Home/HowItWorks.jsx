import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1500px] w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center py-12 gap-12">
        {/* Heading */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl text-white font-medium italic relative inline-block group text-center">
          <span className="hover-underline">How JobZee Works</span>
          <span className="absolute left-0 -bottom-[8px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
        </h3>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full">
          {/* Card 1 */}
          <div className="bg-[linear-gradient(145deg,_#f7f7f7,_#eaeaea)] border-2 border-yellow-500 text-center flex flex-col items-center hover:scale-105 rounded-lg justify-center transition-transform duration-300 h-auto p-6 sm:p-8 gap-3 w-full max-w-[400px] mx-auto">
            <FaUserPlus className="text-4xl text-[#2d5649]" />
            <p className="text-lg sm:text-xl font-semibold">Create Account</p>
            <p className="text-sm sm:text-base text-gray-500">
              Sign up in just a few clicks and set up your profile to start
              exploring thousands of job opportunities tailored to your skills.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[linear-gradient(145deg,_#2a2a2a,_#383838)] border-2 border-yellow-400 text-white text-center hover:scale-105 rounded-lg transition-transform duration-300 flex flex-col items-center justify-center h-auto p-6 sm:p-8 gap-3 w-full max-w-[400px] mx-auto">
            <MdFindInPage className="text-4xl text-[#339c7b]" />
            <p className="text-lg sm:text-xl font-semibold">
              Find a Job / Post a Job
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Browse thousands of job listings or post vacancies to connect with
              the right candidates quickly and easily.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[linear-gradient(145deg,_#f7f7f7,_#eaeaea)] border-2 border-yellow-500 text-center flex flex-col items-center hover:scale-105 rounded-lg justify-center transition-transform duration-300 h-auto p-6 sm:p-8 gap-3 w-full max-w-[400px] mx-auto">
            <IoMdSend className="text-4xl text-[#2d5649]" />
            <p className="text-lg sm:text-xl font-semibold">
              Apply For Jobs / Recruit Candidates
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              Submit applications with ease or find the perfect match for your
              job openings from a pool of qualified professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
