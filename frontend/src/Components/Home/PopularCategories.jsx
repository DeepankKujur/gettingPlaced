import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const navigateTo = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      jobDescription:
        "Create visual content, logos, branding, and UI/UX designs using creative tools like Photoshop, Illustrator, or Figma.",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      jobDescription:
        "Build and maintain mobile apps for Android and iOS using frameworks like Flutter, React Native, or native code.",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      jobDescription:
        "Develop user-facing web interfaces using HTML, CSS, JavaScript, and frontend frameworks like React or Vue.",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      jobDescription:
        "Work on full-stack web apps using MongoDB, Express.js, React, and Node.js with REST APIs and real-time features.",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      jobDescription:
        "Manage financial records, budgeting, auditing, and ensure compliance with financial regulations and tax laws.",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      jobDescription:
        "Develop intelligent systems using machine learning, deep learning, data analysis, and NLP techniques.",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      jobDescription:
        "Design animated videos, motion graphics, and explainer videos using tools like After Effects and Blender.",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      jobDescription:
        "Create interactive games using engines like Unity or Unreal, including gameplay logic, UI, and 3D assets.",
      icon: <IoGameController />,
    },
  ];

  const redirectToCategories = (title) => {
    const encodedTitle = encodeURIComponent(title);
    navigateTo(`/job/getall?search=${encodedTitle}`);
  };
  

  return (
    <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center mt-5 p-12 gap-12 text-center">
      <h3 className="text-5xl text-white font-medium italic relative inline-block group">
        <span className="hover-underline">Popular Categories</span>
        <span className="absolute left-0 -bottom-[16px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
        <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
      </h3>

      <div className="flex flex-wrap justify-evenly gap-10">
        {categories.map((element) => (
          <div
            key={element.id}
            onClick={() => redirectToCategories(element.title)}
            className="w-[320px] h-[180px] bg-gray-100 dark:bg-gray-800 hover:scale-105 p-5 rounded-lg flex items-start gap-4 shadow-sm hover:shadow-lg transition-transform duration-100 border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <div className="text-gray-500 dark:text-gray-400 text-2xl">
              {element.icon}
            </div>
            <div className="text-left">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {element.title}
              </h5>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {element.jobDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
