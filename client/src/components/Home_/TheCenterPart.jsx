import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
function TheCenterPart() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 282);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="relative flex items-center pl-10 bg-[#F9F5F6] text-black font-medium font-Cabin dark:bg-DarkBackground pt-14 max-md:px-5 px-10">
      <motion.section
        className="dark:text-DarkText"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        {/* Big Text Animation */}
        <motion.div className="TheBigTxt">
          <h3
            className="leading-normal font-extrabold"
            style={{ fontSize: isSmallScreen ? "1.5rem" : "3rem" }}
          >
            Empowering Moms with <br /> Every Thoughtful Product Choice
          </h3>
        </motion.div>

        {/* Subtext Animation */}
        <motion.div className="tracking-wider mt-9  text-lg leading-normal dark:text-white">
          <p>
            Supporting moms with practical solutions and resources to make
            parenting
            <br />
            easier and more enjoyable. Explore our offerings today!
          </p>
        </motion.div>

        {/* Button Animation */}
        <motion.div className="mt-10 mb-7" variants={buttonVariants}>
          <NavLink to="/Shop">
            {" "}
            <motion.button
              className="select-none border-2 border-[#F2BED1] p-3 max-w-48 min-w-40 rounded-3xl text-white dark:text-white bg-[#F4A7B9] hover:bg-transparent hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </NavLink>
        </motion.div>

        {/* Social Media Icons Animation */}
        <motion.div
          className="select-none text-xl flex gap-3 mb-2 ml-2 pb-10 mt-48 max-md:mx-auto"
          initial="hidden"
          animate="visible"
          variants={iconVariants}
        >
          <div className="flex gap-4 items-center bg-AuraPinkColor rounded-2xl p-4 shadow-lg max-md:flex-col max-md:items-center">
            <motion.a
              whileHover={{
                scale: 1.2,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-10"
              href="#"
              variants={iconVariants}
            >
              <img
                src="./icons/findusIcons/pinterest.svg"
                alt="Pinterest"
                className="w-8 h-8"
              />
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.2,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-10"
              href="https://www.instagram.com/auramomsbrand?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              variants={iconVariants}
            >
              <img
                src="./icons/findusIcons/instagram.svg"
                alt="Instagram"
                className="w-8 h-8"
              />
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.2,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-10"
              href="https://www.tiktok.com/@auramoms2?_t=8qMmhY31JCs&_r=1"
              target="_blank"
              variants={iconVariants}
            >
              <img
                src="./icons/findusIcons/tiktok.svg"
                alt="TikTok"
                className="w-8 h-8 bg-[#2E2E2E] p-1 rounded-full"
              />
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* Image Animation */}
      <motion.div
        className="absolute right-16 bottom-36"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeatType: "mirror", infinite: true }}
      >
        <img src="/image/MotherHeroSectionImage.png" alt="" />
      </motion.div>
    </main>
  );
}

export default TheCenterPart;
