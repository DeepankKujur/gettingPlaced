// import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Jobs from "./Components/Job/Jobs";
import JobDetails from "./Components/Job/JobDetails";
import PostJob from "./Components/Job/PostJob";
import MyJobs from "./Components/Job/MyJobs";
import Application from "./Components/Application/Application";
import TermsAndConditions from "./Components/Layout/TermsAndConditions";
import AboutUs from "./Components/Layout/AboutUs";
import NotFound from "./Components/NotFound/NotFound";
import Footer from "./Components/Layout/Footer";
import Chatbot from "./Components/Chatbot";
import NewNavbar from "./Components/Layout/NewNav";
import MyApplications from "./Components/Application/MyApplication";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Router>
        <NewNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/application/me" element={<MyApplications />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
        <Footer />
        <Toaster />
      </Router>
    </div>
  );
}
