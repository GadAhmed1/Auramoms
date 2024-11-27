import pannerPhoto from "../../../public/image/pannerPhoto.jpg";
import { motion } from "framer-motion";

const PromoBanner = () => {
  return (
    <div
      className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden mx-auto w-full max-w-3xl lg:max-w-5xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pannerPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10 p-6 md:p-8 flex flex-col items-center text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide"
        >
          Welcome to Your Favorite Store!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white text-sm md:text-lg font-medium py-4"
        >
          Explore the best products tailored just for you.
        </motion.p>
      </div>
    </div>
  );
};

export default PromoBanner;
