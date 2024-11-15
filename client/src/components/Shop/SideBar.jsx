import { useState } from "react";
import { motion } from "framer-motion";
import { Home, ShoppingCart, Heart, User } from "lucide-react";

const VerticalSidebar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "loved", icon: Heart, label: "Loved Items" },
    { id: "cart", icon: ShoppingCart, label: "Shopping Cart" },
    { id: "user", icon: User, label: "User Profile" },
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
      className="h-full w-16 md:w-20 lg:w-24 bg-white dark:bg-gray-900 border-r-transparent  border-gray-200 dark:border-gray-700 fixed flex flex-col items-center py-4 justify-center rounded-lg"
    >
      {/* Sidebar icons */}
      <div className="flex flex-col space-y-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={`transition-all duration-200 p-2 ${
              activeItem === item.id
                ? "border-r-4 border-orange-500 dark:border-orange-400"
                : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.button
              onClick={() => setActiveItem(item.id)}
              className={`p-3 rounded-full transition-colors duration-200 ${
                activeItem === item.id
                  ? "bg-orange-500 dark:bg-orange-400 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-300"
              }`}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label={item.label} // Adds accessibility for screen readers
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
