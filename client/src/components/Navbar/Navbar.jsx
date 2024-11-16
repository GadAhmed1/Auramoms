import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./NavItem.jsx";
import NavButton from "../../layouts/ReUseable/NavButton.jsx";
import ThemeMode from "../../layouts/ReUseable/DarkModeButton.jsx";
import MobileItems from "./MobileNavItem.jsx";
import AuraMoms from "./auraMoms.jsx";
import { CiShoppingCart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import debounce from "lodash.debounce";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleScroll = debounce(() => setHidden(window.scrollY > 0), 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={hidden ? "hidden" : "visible"}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex sticky top-0 w-full justify-between items-center px-4 h-24 font-Cabin  bg-AuraPinkColor shadow-md dark:bg-slate-800 z-50 text-[#799263]"
    >
      <AuraMoms />
      <NavItem />
      <div className=" items-center space-x-6 hidden md:flex">
        <CiShoppingCart
          className="cursor-pointer text-2xl hover:text-gray-500 transition-all"
          aria-label="Shopping Cart"
        />
        <ThemeMode />
        <NavLink to="/Sign_up">
          <NavButton className="bg-[#F4A7B9] dark:bg-white dark:text-black hover:bg-transparent hover:border-[#F2BED1] transition-colors duration-300">
            Sign Up
          </NavButton>
        </NavLink>
      </div>
      <button
        onClick={toggleMenu}
        aria-label="Toggle Mobile Menu"
        className="relative z-20 flex flex-col items-center justify-between w-8 h-6 md:hidden"
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
      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </motion.nav>
  );
};

const MobileMenu = React.memo(({ isOpen, toggleMenu }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="mobileMenu"
        className="flex flex-col fixed md:hidden top-24 bottom-0 right-0 w-[50vw] bg-white shadow-xl dark:bg-black text-black dark:text-white z-[40]"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <MobileItems />
        <div className="flex flex-col items-start gap-4 p-4">
          <select
            className="border p-2 rounded-xl dark:bg-black dark:text-white hover:border-gray-700 transition-all"
            aria-label="Language Selector"
          >
            <option>EN</option>
            <option>FR</option>
          </select>
          <ThemeMode />
          <NavButton className="w-full text-sm px-2 py-2 bg-[#F4A7B9] border-[#F2BED1] hover:border-[#F2BED1]">
            Sign Up
          </NavButton>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

export default Navbar;
