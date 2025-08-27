import "./index.css";
import Jobs from "./Components/Job/Jobs";
import Home from "./Components/Home/Home";
import { Toaster } from "react-hot-toast";
import Chatbot from "./Components/Chatbot";
import { useEffect, useState } from "react";
import Login from "./Components/Auth/Login";
import MyJobs from "./Components/Job/MyJobs";
import PostJob from "./Components/Job/PostJob";
import Footer from "./Components/Layout/Footer";
import Register from "./Components/Auth/Register";
import AboutUs from "./Components/Layout/AboutUs";
import NewNavbar from "./Components/Layout/NewNav";
import JobDetails from "./Components/Job/JobDetails";
import { Typewriter } from "react-simple-typewriter";
import NotFound from "./Components/NotFound/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import Application from "./Components/Application/Application";
import MyApplications from "./Components/Application/MyApplication";
import TermsAndConditions from "./Components/Layout/TermsAndConditions";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Initial Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white px-4">
        <div className="loader mx-6"></div>
        <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          <Typewriter
            words={["Launching your experience...", "Loading magic..."]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </div>
    );
  }
  // Main Application
  return (
    <div>
      <ScrollToTop />
      <NewNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<MyApplications />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
      </Routes>
      <Chatbot />
      <Footer />
      <Toaster />
    </div>
  );
}
