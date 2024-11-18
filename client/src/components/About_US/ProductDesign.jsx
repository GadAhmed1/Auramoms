import { motion } from "framer-motion";

const ProductDesign = () => {
  return (
    <div>
      {/* Image Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-12 relative"
        initial="hidden"
        animate="visible"
        exit="hidden"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1, // Reduced stagger duration for faster animation
            },
          },
          hidden: {},
        }}
      >
        {/* Left Images (2) */}
        <motion.div
          className="w-full md:w-1/3 flex flex-col items-center gap-8 cursor-pointer"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Reduced duration for faster animation
        >
          <motion.img
            src="../../../public/image/Green.jpg"
            alt="AuraMoms image 1"
            className="rounded-lg shadow-lg object-cover w-full h-auto rotate-12 hover:rotate-0 transition-transform duration-500"
            animate={{
              x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
              rotate: [0, 10, -10, 0], // Added rotation animation
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.img
            src="../../../public/image/El3enb.png"
            alt="AuraMoms image 2"
            className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-12 hover:rotate-0 transition-transform duration-500"
            animate={{
              x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
              rotate: [0, -10, 10, 0], // Added rotation animation
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
        {/* Vertical Line (between the images) */}
        <motion.div
          className="hidden md:block h-full border-l-2 border-muted-foreground mx-4 bg-black"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100%" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }} // Reduced duration for faster animation
        />
        {/* Right Image (1) */}
        <motion.div
          className="w-full md:w-1/3 relative group"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Reduced duration for faster animation
        >
          <motion.img
            src="../../../public/image/ChinesPhoto.jpg"
            alt="AuraMoms image 3"
            className="rounded-lg shadow-lg object-cover w-full h-auto rotate-6 hover:rotate-0 transition-transform duration-500"
            animate={{
              x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
              rotate: [0, 15, -15, 0], // Added rotation animation
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          {/* Hidden Text on Hover */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDesign;
