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
import MyApplication from "./components/Application/MyApplication.jsx";
import NotFound from "./components/NotFound/NotFound";
import JobCategoriesPage from "./components/Job/JobCategoriesPage";

import NewFooter from "./components/Layout/NewFooter";
import NewNavbar from "./components/Layout/NewNav";
import Chatbot from "./Components/Chatbot";

export default function App() {
  return (
    <Router>
      <NewNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJobs />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<MyApplication />} />
        <Route path="/job-categories" element={<JobCategoriesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
      <NewFooter />
      <Toaster />
    </Router>
  );
}
