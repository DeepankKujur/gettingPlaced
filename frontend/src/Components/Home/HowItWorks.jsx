import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1500px] w-full px-4 lg:px-0 mx-auto flex flex-col items-center py-12 gap-12">
        <h3 className="text-5xl text-white font-medium italic relative inline-block group">
          <span className="hover-underline">How Job-Net Works</span>
          <span className="absolute left-0 -bottom-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
          <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
        </h3>

        <div className="flex justify-between gap-6 flex-wrap lg:flex-nowrap w-full px-4">
          <div className="bg-[linear-gradient(145deg,_#f7f7f7,_#eaeaea)] border-2 border-yellow-500 text-center flex flex-col items-center hover:scale-110 rounded-lg justify-center flex-1 transition-transform duration-200 h-[350px] p-8 gap-3 w-full max-w-[400px]">
            <FaUserPlus className="text-4xl text-[#2d5649]" />
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-md text-gray-500">
              Sign up in just a few clicks and set up your profile to start
              exploring thousands of job opportunities tailored to your skills.
            </p>
          </div>

          <div className="bg-[linear-gradient(145deg,_#2a2a2a,_#383838)] border-2 border-yellow-400 text-white text-center hover:scale-110 rounded-lg transition-transform duration-200 flex flex-col items-center justify-center flex-1 h-[350px] p-8 gap-3 w-full max-w-[400px]">
            <MdFindInPage className="text-4xl text-[#339c7b]" />
            <p className="text-xl font-semibold">Find a Job/Post a Job</p> 
            <p className="text-md text-gray-400">
              Browse thousands of job listings or post vacancies to connect with
              the right candidates quickly and easily.
            </p>
          </div>

          <div className="bg-[linear-gradient(145deg,_#f7f7f7,_#eaeaea)] border-2 border-yellow-500 text-center flex flex-col items-center rounded-lg transition-transform duration-200 hover:scale-110 justify-center flex-1 h-[350px] p-8 gap-3 w-full max-w-[400px]">
            <IoMdSend className="text-4xl text-[#2d5649]" />
            <p className="text-xl font-semibold">
              Apply For Job/Recruit Suitable Candidates
            </p>
            <p className="text-md text-gray-500">
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
