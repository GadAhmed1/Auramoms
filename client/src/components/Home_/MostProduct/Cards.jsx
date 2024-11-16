import { motion } from "framer-motion";
import NavButton from "../../../layouts/ReUseable/NavButton";

const Cards = () => {
  const Image = [
    {
      id: 1,
      src: "./public/products/Pro1.png",
      title: "Pro 1",
      description: "Very nice and the price is good",
      Price: "120.00$",
    },
    {
      id: 2,
      src: "./public/products/Pro2.png",
      title: "Pro 2",
      description: "A serene path through the forest.",
      Price: "125.00$",
    },
    {
      id: 3,
      src: "./public/products/Pro3.png",
      title: "Pro 3",
      description: "A sandy desert under the blue sky.",
      Price: "90.00$",
    },
  ];

  // Variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="dark:text-white flex flex-col items-center">
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-center text-3xl font-PlayWrite mb-10">
          Most Popular !!
        </h1>
      </div>
      <motion.div
        className="w-11/12 max-w-6xl flex flex-wrap justify-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.3 }} // Ensures it only animates once when 30% of the container is in view
      >
        {Image.map((img) => (
          <motion.section
            key={img.id}
            className="relative w-80 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="relative cursor-pointer flex flex-col items-center">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-96 object-contain rounded-xl shadow-2xl transition-transform duration-300 transform hover:scale-105"
              />
              <div className="mt-6 space-y-4 text-center text-black dark:text-white">
                <h3 className="text-xl font-bold mb-2 font-PlayWrite">
                  {img.title}
                </h3>
                <p className="font-Mate font-semibold">{img.description}</p>
                <p className="font-Mate font-bold">{img.Price}</p>
                <NavButton className=" dark:text-white">Check Out Now</NavButton>
              </div>
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
};

export default Cards;
