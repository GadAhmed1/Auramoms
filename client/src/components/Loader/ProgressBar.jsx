import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollProgress(scrollPercent);
  };

  // Attach event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-2 bg-pink-500 z-50"
      animate={{
        width: `${scrollProgress}%`, // Animate the width smoothly
      }}
      initial={{ width: 0 }} // Initial state with no width
      transition={{
        width: {
          type: "spring", // Smooth spring animation for the width
          stiffness: 100, // Controls the bounciness
          damping: 25, // Controls how smooth the transition is
        },
      }}
    />
  );
};

export default ProgressBar;
