import React from "react";

const NavButton = ({ children, className = "" }) => {
  return (
    <button
      className={` ${className} bg-[#040002] rounded-2xl px-6 py-3 transition-all uppercase text-white font-Cabin border 
    hover:bg-white hover:text-black hover:border-black 
      dark:border-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white
    `}
    >
      {children}
    </button>
  );
};

export default NavButton;
