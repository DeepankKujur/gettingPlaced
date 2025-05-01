import React,{useEffect} from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const AboutUs = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const users = [
    {
      name: "Deepank Kujur",
      role: "Full Stack Developer",
      description: (
        <div className="text-sm text-gray-300 px-4 mb-6">
          <ul className="list-disc list-inside">
            <li>Frontend Technologies: React.js, HTML, CSS, JavaScript</li>
            <li>Responsive Design & Performance Optimization</li>
            <li>Backend Integration with Node.js, Express, Strapi CMS, MongoDB, Node.js</li>
          </ul>
        </div>
      ),
      image:
        "/Deepank.jpg",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Harshit Verma",
      role: "Full Stack Developer",
      description: (
        <div className="text-sm text-gray-300 px-4 mb-6">
          <ul className="list-disc list-inside">
            <li>Backend Technologies: Node.js, Express,Strapi CMS, MongoDB</li>
            <li>Frontend Contributions: UI, React.js, JavaScript, HTML, CSS</li>
          </ul>
        </div>
      ),
      image:
        "/GauravSingh.jpg",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Gaurav Simkar",
      role: "Full Stack Developer",
      description: (
        <div className="text-sm text-gray-300 px-4 mb-6">
          <ul className="list-disc list-inside">
            <li>Developed scalable web applications</li>
            <li>Tech Stack: React.js, Node.js, Express, Strapi CMS,MongoDB, Python</li>
            <li>Database Optimization & Performance Tuning</li>
          </ul>
        </div>
      ),
      image:
        "Gauravsim.jpg",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center px-6 py-12">
      <div className="flex flex-wrap justify-center gap-12">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-2xl shadow-2xl p-10 w-[400px] h-[550px] text-center relative transform hover:scale-105 hover:shadow-2xl transition duration-500 ease-in-out"
          >
            {/* Profile Image */}
            <div className="flex justify-center -mt-24">
              <img
                src={user.image}
                alt={user.name}
                className="w-48 h-48 rounded-full object-cover border-8 border-gray-700 shadow-lg scale-120"
              />
            </div>

            {/* User Info */}
            <h2 className="text-4xl font-bold mt-8">{user.name}</h2>
            <p className="text-lg font-bold text-yellow-400 mb-4">{user.role}</p>

            {/* Divider */}
            <div className="w-30 h-1 bg-gradient-to-r from-yellow-500 to-yellow-200 mx-auto rounded-full mb-4"></div>

            {/* Description Section */}
            <div className="text-sm text-gray-300 px-4 mb-6">{user.description}</div>

            {/* Social Media Links at Bottom */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              <a
                href={user.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition transform hover:scale-125"
              >
                <FaTwitter size={50} />
              </a>
              <a
                href={user.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition transform hover:scale-125"
              >
                <FaLinkedin size={50} />
              </a>
              <a
                href={user.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition transform hover:scale-125"
              >
                <FaGithub size={50} />
              </a>
              <a
                href={user.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition transform hover:scale-125"
              >
                <FaInstagram size={50} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;