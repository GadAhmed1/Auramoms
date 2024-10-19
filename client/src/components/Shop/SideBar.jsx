import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, ShoppingCart, Heart, User } from "lucide-react";

const VerticalSidebar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const items = [
    { id: "home", icon: Home },
    { id: "loved", icon: Heart },
    { id: "cart", icon: ShoppingCart },
    { id: "user", icon: User },
  ];

  const sidebarVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: 64, opacity: 1, transition: { duration: 0.5 } },
  };

  const iconVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="h-screen w-16 bg-white border-r border-gray-200 fixed flex flex-col items-center py-4 justify-center"
    >
      {/* Sidebar icons */}
      <div className="flex flex-col space-y-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={`transition-all duration-200 p-2 ${
              activeItem === item.id ? "border-r-2 border-orange-500" : ""
            }`}
            whileHover={{ scale: 1.05 }} // Slightly enlarge on hover
          >
            <motion.button
              onClick={() => setActiveItem(item.id)}
              className={`p-3 rounded-full transition-colors duration-200 ${
                activeItem === item.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <item.icon className="w-6 h-6" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VerticalSidebar;
