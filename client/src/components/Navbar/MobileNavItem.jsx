import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaShoppingBasket } from "react-icons/fa";
import { HiArchive } from "react-icons/hi";
import { IoIosContacts } from "react-icons/io";
import { FaHeartCirclePlus, FaCartShopping } from "react-icons/fa6";
import PropTypes from "prop-types";

const FlyOut = ({ children, to, ...props }) => {
  return (
    <motion.div
      {...props}
      className="relative w-full h-fit transition-all hover:bg-[#ddd] dark:hover:bg-white/25"
    >
      <NavLink to={to} className="relative">
        {children}
      </NavLink>
    </motion.div>
  );
};

FlyOut.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

const NavItem = () => {
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
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={staggerContainer}
      className="flex capitalize flex-col mt-5 h-fit w-full font-Cabin border-b-2 border-b-slate-300 mb-5 pb-4 gap-4 divide-gray-300 dark:divide-white text-black dark:text-white z-50"
    >
      <FlyOut variants={staggerItem} to="/">
        <FaHome className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">home</p> {/* Translated "Home" */}
      </FlyOut>

      <FlyOut variants={staggerItem} to="/about">
        <HiArchive className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">about</p> {/* Translated "About" */}
      </FlyOut>

      <FlyOut variants={staggerItem} to="/contact">
        <IoIosContacts className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">contact</p> {/* Translated "Contact" */}
      </FlyOut>

      <FlyOut variants={staggerItem} to="/shop">
        <FaShoppingBasket className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">shop</p> {/* Translated "Shop" */}
      </FlyOut>
      <FlyOut variants={staggerItem} to="/favorites">
        <FaHeartCirclePlus className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">Favorites</p> {/* Translated "Favorites" */}
      </FlyOut>
      <FlyOut variants={staggerItem} to="/cart">
        <FaCartShopping className="absolute -translate-y-1/2 top-1/2 mx-3" />
        <p className="pl-10 py-3">Cart</p> {/* Translated "Cart" */}
      </FlyOut>
    </motion.div>
  );
};

export default NavItem;
