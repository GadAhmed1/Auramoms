import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./NavItem.jsx";
import NavButton from "../../layouts/ReUseable/NavButton.jsx";
import ThemeMode from "../../layouts/ReUseable/DarkModeButton.jsx";
import MobileItems from "./MobileNavItem.jsx";
import AuraMoms from "./auraMoms.jsx";
import { CiShoppingCart } from "react-icons/ci"; // Normal import, no lazy loading
import { NavLink } from "react-router-dom";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // Start with Navbar visible

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setHidden(true);
      else setHidden(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={hidden ? "hidden" : "visible"}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex sticky top-0 w-full justify-between items-center px-4 h-24 text-[#799263] font-Cabin dark:bg-[#46644c] shadow-md bg-[#fff] z-50"
      >
        <AuraMoms />
        <NavItem />
        {/* Desktop Menu */}
        <div className="flex justify-center items-center space-x-6 max-md:hidden">
          <CiShoppingCart className="cursor-pointer text-2xl hover:text-gray-500 transition-all" />
          <ThemeMode />
          <NavLink to="/Sign_up">
            <NavButton className="bg-[#46644c] dark:bg-[#46644c] hover:scale-105 duration-300">
              signUp
            </NavButton>
          </NavLink>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative z-20 flex flex-col items-center justify-between w-8 h-6"
          >
            <motion.div
              className="w-full h-1 bg-black dark:bg-white rounded"
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.div
              className="w-full h-1 bg-black dark:bg-white rounded"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="w-full h-1 bg-black dark:bg-white rounded"
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      </motion.nav>
    </>
  );
};

// Extracted MobileMenu component
const MobileMenu = React.memo(({ isOpen, toggleMenu }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="mobileMenu"
        className="flex flex-col fixed md:hidden top-24 bottom-0 right-0 w-[50vw] bg-[#fff] shadow-xl dark:bg-black text-black dark:text-white z-[40]"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div>
          <MobileItems />
        </motion.div>
        <motion.div className="flex justify-center items-start flex-col gap-4">
          <motion.select className="border p-1 ml-2 rounded-xl hover:border-gray-700 transition-all dark:bg-black dark:text-white">
            <option>EN</option>
            <option>FR</option>
          </motion.select>
          <motion.div className="pl-2">
            <ThemeMode />
          </motion.div>
          <motion.div className="w-full px-2">
            <NavButton className="px-2 py-2 text-sm w-full bg-[#46644c] dark:bg-[#46644c]">
              signUp
            </NavButton>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));

export default Navbar;
