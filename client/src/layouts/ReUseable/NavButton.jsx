import PropTypes from "prop-types";
import { motion } from "framer-motion";
const NavButton = ({ children, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={` ${className} bg-[#040002] rounded-2xl px-6 py-3  uppercase text-white font-Cabin border 
    `}
    >
      {children}
    </motion.button>
  );
};

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default NavButton;
