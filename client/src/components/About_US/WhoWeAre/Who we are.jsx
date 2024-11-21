/* eslint-disable no-unused-vars */
// src/components/WhoWeAre.js
import { motion } from "framer-motion";
import React from "react";
import Part from "./whoWeAReCompo";
import { NavLink } from "react-router-dom";

function WhoWeAre() {
  return (
    <div className="dark:text-[#EAEAEA] pt-14 pb-14 text-center dark:bg-[#121212] bg-[#F8F9FA] text-[#1A1A1A]">
      <h3 className="text-3xl mx-4 md:mx-12 lg:mx-52 font-semibold dark:text-[#F4A7B9] text-[#B56576]">
        What about us?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-9 mt-8">
        <Part
          imageSrc="./image/OurMissionImage.png"
          title="Our Mission"
          description="Empowering moms with thoughtful, quality products for their needs."
          bgColor="bg-[#F9F5F6] dark:bg-[#1A1D21]"
          borderColor="border-[#F4A7B9] dark:border-[#4B5563]"
        />
        <Part
          imageSrc="./image/OurStory.jpg"
          title="Our Story"
          description="Founded to uplift and support parents with care and innovation."
          bgColor="bg-[#F9F5F6] dark:bg-[#1A1D21]"
          borderColor="border-[#F4A7B9] dark:border-[#4B5563]"
        />
        <Part
          imageSrc="./image/WhyChooseUS.svg"
          title="Why Choose Us"
          description="Your trusted partner in parenting with dedicated, reliable support."
          bgColor="bg-[#F9F5F6] dark:bg-[#1A1D21]"
          borderColor="border-[#F4A7B9] dark:border-[#4B5563]"
        />
      </div>
      <div className="mt-8 ButtonPart">
        <NavLink to="/shop">
          <motion.button
            className="select-none border-2 font-semibold border-[#F2BED1] p-2 max-w-48 min-w-48 rounded-3xl text-white bg-[#F4A7B9]   transition-colors duration-300 shadow-lg dark:text-white"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now
          </motion.button>
        </NavLink>
      </div>
    </div>
  );
}

export default WhoWeAre;
