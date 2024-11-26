import React, { useState, useCallback, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import NavItem from "./NavItem.jsx";
import NavButton from "../../layouts/ReUseable/NavButton.jsx";
import ThemeMode from "../../layouts/ReUseable/DarkModeButton.jsx";
import MobileItems from "./MobileNavItem.jsx";
import AuraMoms from "./auraMoms.jsx";
import {
  FaCartShopping,
  FaHeartCirclePlus,
  FaCircleUser,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useCart } from "../context/CartContext.jsx";
import { ShopContext } from "../../context/ShopContext.jsx";

const Navbar = ({ setshowLogin }) => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const storedUsername = localStorage.getItem("username");
  // const cartCount = localStorage.getItem("cartCount");
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const { token, setToken } = useContext(ShopContext);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
  }, [setToken]);
<<<<<<< HEAD
  // useEffect(() => {
  //   const handleScroll = debounce(() => setHidden(window.scrollY > 0), 100);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
    
  // }, []);
=======

>>>>>>> 5ff0fd22cdbd72cb03b222ccc9247c418bdd818a
  return (
    <motion.nav
      initial="visible"
      animate="visible"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex sticky z-50 top-0 w-full justify-between items-center px-4 h-20 font-Cabin bg-AuraPinkColor shadow-md dark:bg-slate-800 text-[#799263]"
    >
      <AuraMoms />
      <NavItem />
      <div className="items-center space-x-6 hidden md:flex">
        <NavLink
          to="/favorites"
          className="relative text-lg font-medium hover:text-gray-300"
        >
          <FaHeartCirclePlus
            className="cursor-pointer text-3xl text-[#F4A7B9] dark:text-[#d86a84] hover:text-gray-500 transition-all"
            aria-label="Favorites Cart"
          />
        </NavLink>

        <NavLink to="/Cart" className="relative">
          <FaCartShopping
            className="cursor-pointer text-3xl text-[#F4A7B9] dark:text-[#d86a84] hover:text-gray-500 transition-all"
            aria-label="Shopping Cart"
          />

          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-2 bg-[#b1b2b3] text-white text-xs font-bold w-5 h-5
                  flex items-center justify-center rounded-full shadow-lg animate-bounce dark:bg-white dark:text-black"
            >
              {cartCount}
            </span>
          )}
        </NavLink>
        <ThemeMode />
        <NavLink to="/Sign_up">
          {!token ? (
            <NavButton
              title="Login/Sign Up"
              onClick={() => setshowLogin(true)}
              className="w-full text-sm px-2 py-4 bg-[#F4A7B9] dark:bg-[#d86a84] hover:scale-105 hover:bg-[#e790b0] border-none"
            >
              Sign Up
            </NavButton>
          ) : (
            <div className="group relative">
              <div className="flex flex-col justify-center items-center text-center bg-[#F4A7B9] px-2.5 py-1.5 rounded-xl dark:text-black dark:bg-[#d86a84]">
                <FaCircleUser className="text-2xl text-white" />
                <span className="text-white">{storedUsername}</span>
              </div>

              <ul className="bg-white shadow-sm p-3 w-36 ring-1 ring-slate-900/15 group-hover:flex hidden cursor-pointer absolute rounded right-0 text-black">
                <li
                  onClick={() => {
                    if (token) {
                      alert("You are already signed in.");
                    } else {
                      logout();
                    }
                  }}
                  className="flex justify-center items-center gap-2"
                >
                  <TbLogout className="text-black text-2xl" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
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
      <MobileMenu
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        setshowLogin={setshowLogin}
        token={token}
        storedUsername={storedUsername}
        logout={logout}
        cartCount={cartCount}
      />
    </motion.nav>
  );
};

Navbar.propTypes = {
  setshowLogin: PropTypes.func.isRequired,
};

const MobileMenu = React.memo(
  ({ isOpen, setshowLogin, token, storedUsername, logout }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobileMen"
          className="flex flex-col fixed md:hidden top-20 bottom-0 right-0 w-[50vw] bg-white shadow-xl dark:bg-slate-900 text-black dark:text-white z-[40]"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <MobileItems />
          <div className="flex flex-col items-start gap-4 p-4">
            <select
              className="border p-2 rounded-xl dark:bg-slate-900 dark:text-white hover:border-gray-700 transition-all"
              aria-label="Language Selector"
            >
              <option>EN</option>
              <option>FR</option>
            </select>
            <ThemeMode />

            <NavLink to="/Sign_up" className="w-full">
              {!token ? (
                <NavButton
                  title="Login/Sign Up"
                  onClick={() => setshowLogin(true)}
                  className="w-full text-sm px-2 py-2 bg-[#F4A7B9] hover:scale-105 hover:bg-[#e790b0] border-none"
                >
                  Sign Up
                </NavButton>
              ) : (
                <div className="group relative w-full">
                  <div className="flex flex-col justify-center items-center text-center w-full">
                    <FaCircleUser className="text-2xl flex justify-center items-center text-center" />
                    {storedUsername}
                  </div>
                  <ul className="bg-white shadow-sm p-3 w-36 ring-1 ring-slate-900/15 group-hover:flex hidden cursor-pointer absolute rounded right-0">
                    <li
                      onClick={logout}
                      className="flex justify-center items-center gap-2"
                    >
                      <TbLogout className="text-black text-2xl" />
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              )}
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);

MobileMenu.displayName = "MobileMenu";

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  setshowLogin: PropTypes.func.isRequired,
  token: PropTypes.string,
  storedUsername: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
