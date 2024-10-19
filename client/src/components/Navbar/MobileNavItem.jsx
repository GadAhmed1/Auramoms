import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaShoppingBasket } from "react-icons/fa";
import { HiArchive } from "react-icons/hi";
import { IoIosContacts } from "react-icons/io";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const NavItem = () => {
  const { t } = useTranslation(); // Initialize translation hook

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger in animations
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1, // Stagger out animations
        staggerDirection: -1, // Reverse stagger direction on exit
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 }, // Hidden state: invisible and lower
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Visible state: fade in and rise up
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }, // Exit state: fade out and lower
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={staggerContainer}
        className="flex capitalize flex-col mt-5 h-fit w-full font-Cabin border-b-2 border-b-slate-300 mb-5  pb-4 gap-4 divide-gray-300 dark:divide-white text-black dark:text-white z-50"
      >
        <FlyOut
          variants={staggerItem}
          to="/"
          FlyoutContent
          className="relative"
        >
          <FaHome className="absolute -translate-y-1/2 top-1/2 mx-3 " />
          <p className="pl-10 py-3">home</p> {/* Translated "Home" */}
        </FlyOut>

        <FlyOut variants={staggerItem} to="/about" FlyoutContent>
          <HiArchive className="absolute -translate-y-1/2 top-1/2 mx-3" />
          <p className="pl-10 py-3">about</p> {/* Translated "About" */}
        </FlyOut>

        <FlyOut variants={staggerItem} to="/contact" FlyoutContent>
          <IoIosContacts className="absolute -translate-y-1/2 top-1/2 mx-3" />
          <p className="pl-10 py-3">contact</p> {/* Translated "Contact" */}
        </FlyOut>

        <FlyOut variants={staggerItem} to="/shop" FlyoutContent>
          <FaShoppingBasket className="absolute -translate-y-1/2 top-1/2 mx-3 " />
          <p className="pl-10 py-3">shop</p> {/* Translated "Shop" */}
        </FlyOut>
      </motion.div>
    </>
  );
};

const FlyOut = ({ children, to, FlyoutContent, className = "", ...props }) => {
  const [Open, setOpen] = useState(false);

  return (
    <motion.div
      {...props}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-full h-fit transition-all hover:bg-[#ddd]  dark:hover:bg-white/25"
    >
      <NavLink to={to} className="relative">
        {children}
      </NavLink>
    </motion.div>
  );
};

export default NavItem;
