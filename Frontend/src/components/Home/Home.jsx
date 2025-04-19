import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import BgAnimation from "../Layout/BgAnimation";

const Home = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 h-full w-full -z-10">
        <BgAnimation />
      </div>
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
    </div>
  );
};

export default Home;
