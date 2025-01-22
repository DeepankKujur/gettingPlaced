import React from "react";
import "../../App.jsx"; // Import the CSS file

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
    <div className="job-categories">
      <h1 className="title">Job Categories</h1>
      <div className="grid-container">
        {jobCategories.map((category, index) => (
          <div key={index} className="card">
            <img
              src={category.image}
              alt={category.title}
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">{category.title}</h2>
              <p className="card-description">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoriesPage;
