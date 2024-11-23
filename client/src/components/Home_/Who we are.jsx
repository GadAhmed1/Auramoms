/* eslint-disable no-unused-vars */
// src/components/WhoWeAre.js
import React from "react";
import { motion } from "framer-motion";
import Part from "../About_US/WhoWeAre/whoWeAReCompo";
import { NavLink } from "react-router-dom";

const WhoWeAre = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const partsData = [
    {
      imageSrc: "./image/OurMissionImage.png",
      title: "Our Mission",
      description:
        "Empowering moms with thoughtful, quality products for their needs.",
    },
    {
      imageSrc: "./image/OurStory.jpg",
      title: "Our Story",
      description:
        "Founded to uplift and support parents with care and innovation.",
    },
    {
      imageSrc: "./image/WhyChooseUS.svg",
      title: "Why Choose Us",
      description:
        "Your trusted partner in parenting with dedicated, reliable support.",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="dark:text-[#EAEAEA] pt-14 pb-14 text-center dark:bg-DarkBackground bg-[#F8F9FA] text-[#1A1A1A]"
    >
      <motion.h3
        variants={itemVariants}
        className="text-3xl mx-4 md:mx-12 lg:mx-52 font-semibold dark:text-[#F4A7B9] text-[#B56576]"
      >
        What about us?
      </motion.h3>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-9 mt-8"
      >
        {partsData.map((part, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Part
              imageSrc={part.imageSrc}
              title={part.title}
              description={part.description}
              bgColor="bg-[#F9F5F6] dark:bg-DarkBackground"
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={itemVariants} className="mt-8 ButtonPart">
        <NavLink to="/about">
          <motion.button
            className="select-none border-2 font-semibold border-[#F2BED1] p-2 max-w-48 min-w-48 rounded-3xl text-white bg-[#F4A7B9] dark:bg-[#d86a84] dark:border-none transition-colors duration-300 shadow-lg dark:text-white"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 5px 15px rgba(244, 167, 185, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            About Us
          </motion.button>
        </NavLink>
      </motion.div>
    </motion.div>
  );
};

export default WhoWeAre;
