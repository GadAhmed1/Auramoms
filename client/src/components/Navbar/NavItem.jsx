import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Component for individual navigation items
const NavItem = ({ className = "" }) => {
  return (
    <div
      className={`${className} flex space-x-12 max-md:hidden text-black dark:text-white capitalize`}
    >
      <FlyOut to="/" label="home" />
      <FlyOut to="/about" label="about" />
      <FlyOut to="/contact" label="contact" />
      <FlyOut to="/shop" label="shop" />
    </div>
  );
};

// FlyOut component to handle hover and navigation link animations
const FlyOut = ({ children, to, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative w-fit h-fit"
    >
      <NavLink to={to} className="relative">
        <p>{label}</p>
        <span
          style={{ transform: isOpen ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -bottom-2 -left-2 h-[5px] -right-2 
            rounded-full bg-pink-500 transition-transform duration-300 ease-in-out "
        />
      </NavLink>
    </div>
  );
};

export default NavItem;
