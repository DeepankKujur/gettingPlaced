// import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Jobs from "./components/Job/Jobs";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import MyJobs from "./components/Job/MyJobs";
import PostJobs from "./components/Job/PostJob";
import Register from "./components/Auth/Register";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import NotFound from "./components/NotFound/NotFound";

import Footer from "./Components/Layout/Footer";
import NewNavbar from "./components/Layout/NewNav";
import Chatbot from "./Components/Chatbot";
import MyApplications from "./Components/Application/MyApplication";
import TermsAndConditions from "./Components/Layout/TermsAndConditions";
import AboutUs from "./Components/Layout/AboutUs";

export default function App() {
  return (
    <Router>
      <NewNavbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJobs />} />
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
  );
}
