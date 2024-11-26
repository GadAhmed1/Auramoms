import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import HeroImg from "/image/Snap the moment-pana.png";

function TheCenterPart() {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
    button: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      },
    },
    icon: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.2 },
      },
    },
  };

  const socialIcons = [
    { href: "#", src: "./icons/findusIcons/pinterest.svg", alt: "Pinterest" },
    {
      href: "https://www.instagram.com/auramomsbrand?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      src: "./icons/findusIcons/instagram.svg",
      alt: "Instagram",
      target: "_blank",
    },
    {
      href: "https://www.tiktok.com/@auramoms2?_t=8qMmhY31JCs&_r=1",
      src: "./icons/findusIcons/tiktok.svg",
      alt: "TikTok",
      target: "_blank",
      className: "bg-[#2E2E2E] p-1 rounded-full",
    },
  ];

  return (
    <main className="relative flex items-center justify-between bg-[#F9F5F6] text-black pt-10 font-medium font-Cabin dark:bg-DarkBackground max-md:px-5 px-10 max-md:flex-col max-md:items-center">
      <motion.section
        className="flex-1 dark:text-DarkText"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <motion.div
          variants={variants.fadeInUp}
          className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-pink-100 dark:bg-pink-900/30"
        >
          <span className="text-sm font-medium text-pink-600 dark:text-pink-300">
            Discover Our Collection
          </span>
        </motion.div>
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          variants={variants.fadeInUp}
        >
          Empowering Moms with
          <br />
          <span className="text-[#f07a96] dark:text-[#d86a84]">
            Every Thoughtful Product Choice
          </span>
        </motion.h1>
        <motion.div className="tracking-wider mt-9 text-lg leading-normal dark:text-white">
          <p>
            Supporting moms with practical solutions and resources to make
            parenting
            <br />
            easier and more enjoyable. Explore our offerings today!
          </p>
        </motion.div>
        <motion.div className="mt-10 mb-7" variants={variants.button}>
          <NavLink to="/Shop">
            <motion.button
              className="select-none border-2 border-[#F2BED1] p-3 max-w-48 min-w-40 rounded-3xl text-white dark:text-white bg-[#f07a96] dark:bg-[#d86a84] dark:border-none hover:bg-transparent hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </NavLink>
        </motion.div>
        <motion.div
          className="select-none text-xl flex gap-3 mb-2 ml-2 pb-10 mt-32 max-md:mt-20 max-md:mx-auto max-md:flex-col max-md:items-center"
          initial="hidden"
          animate="visible"
          variants={variants.icon}
        >
          <div className="flex gap-4 items-center bg-AuraPinkColor dark:bg-slate-800 rounded-2xl p-4 shadow-lg max-md:flex-row max-md:justify-center max-md:items-center">
            {socialIcons.map((icon, index) => (
              <motion.a
                key={index}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-10"
                href={icon.href}
                target={icon.target}
                variants={variants.icon}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className={`w-8 h-8 ${icon.className || ""}`}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.section>
      <motion.div
        className="flex-1 flex justify-center mb-10 items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={HeroImg}
          className="w-2/3 h-2/3  max-md:w-1/2 "
          alt="Mother Hero Section"
        />
      </motion.div>
    </main>
  );
}

export default TheCenterPart;
