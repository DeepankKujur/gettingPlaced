import React from "react";
import BgAnimation from "../Layout/BgAnimation";

const jobCategories = [
  {
    title: "Software Engineer",
    description:
      "Responsible for designing, developing, and maintaining software systems.",
    image: `https://picsum.photos/seed/software-engineer/300/400`,
  },
  {
    title: "Data Scientist",
    description:
      "Analyze and interpret complex data to help organizations make informed decisions.",
    image: `https://picsum.photos/seed/data-scientist/300/500`,
  },
  {
    title: "Product Manager",
    description:
      "Oversees product development and ensures successful delivery of features.",
    image: `https://picsum.photos/seed/product-manager/300/450`,
  },
  {
    title: "Graphic Designer",
    description:
      "Creates visual concepts to communicate ideas that inspire, inform, and captivate consumers.",
    image: `https://picsum.photos/seed/graphic-designer/300/350`,
  },
  {
    title: "Digital Marketer",
    description:
      "Plans and executes marketing campaigns to promote products and services online.",
    image: `https://picsum.photos/seed/digital-marketer/300/600`,
  },
  {
    title: "Human Resources Specialist",
    description:
      "Manages recruitment, employee relations, and organizational development.",
    image: `https://picsum.photos/seed/human-resources/300/320`,
  },
  {
    title: "Financial Analyst",
    description:
      "Analyzes financial data to help organizations make investment decisions.",
    image: `https://picsum.photos/seed/financial-analyst/300/400`,
  },
];

const JobCategoriesPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>   
      <h3 className="text-4xl text-white font-medium mb-6 italic relative inline-block group">
        <span className="hover-underline">Job Categories</span>
        <span className="absolute left-0 -bottom-[14px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500"></span>
        <span className="absolute left-0 -top-[5px] w-full h-[5px] bg-gradient-to-r from-red-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left group-hover:origin-right transition-transform duration-500"></span>
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobCategories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold dark:text-white text-black mb-2">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoriesPage;
