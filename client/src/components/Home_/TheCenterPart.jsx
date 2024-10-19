import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

function TheCenterPart() {
  const FaceBook = useRef();
  const insta = useRef();
  const tiktok = useRef();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 282);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Variants for text animation
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // Variants for button animation
  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Variants for social media icons animation
  const iconVariant = {
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
    <main className="relative flex items-center pl-10 bg-[#dde2cc] text-black font-medium font-Cabin dark:bg-DarkBackground pt-14 max-md:px-5">
      <motion.section
        className="dark:text-DarkText"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        {/* Big Text Animation */}
        <motion.div className="TheBigTxt">
          <h3
            className="leading-normal font-extrabold"
            style={{ fontSize: isSmallScreen ? "1.5rem" : "3rem" }} // Adjust font size based on screen width
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
        <motion.div className="mt-10 mb-7" variants={buttonVariant}>
          <motion.button
            className="select-none border-2 border-[#416048] p-3 max-w-48 min-w-40 rounded-3xl text-white dark:text-white bg-[#416048] hover:bg-transparent hover:text-black transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Now
          </motion.button>
        </motion.div>

        {/* Social Media Icons Animation */}
        <motion.div
          className="select-none FindUs text-xl flex gap-3 mb-2 ml-2 pb-10 mt-48"
          initial="hidden"
          animate="visible"
          variants={iconVariant}
        >
          <p>Find Us On:</p>
          <div className="flex gap-3 items-center icons">
            <motion.a
              whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.1 } }}
              ref={FaceBook}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-6"
              href="#"
              variants={iconVariant}
            >
              <img src="./icons/findusIcons/pinterest.svg" alt="Pinterest" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.1 } }}
              ref={insta}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-6"
              href="#"
              variants={iconVariant}
            >
              <img src="./icons/findusIcons/instagram.svg" alt="Instagram" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.1 } }}
              ref={tiktok}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 inline-block w-6"
              href="#"
              variants={iconVariant}
            >
              <img src="./icons/findusIcons/tiktok.svg" alt="TikTok" />
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
        <img src="./image/MotherHeroSectionImage.png" alt="" />
      </motion.div>
    </main>
  );
}

export default TheCenterPart;
