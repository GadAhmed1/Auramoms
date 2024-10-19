/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ className = "" }) => {
  return (
    <div
      className={`${className} flex space-x-12 max-md:hidden text-black dark:text-white capitalize`}
    >
      <FlyOut to="/" FlyoutContent>
        <p>home</p>
      </FlyOut>
      <FlyOut to="/about" FlyoutContent>
        <p>about</p>
      </FlyOut>
      <FlyOut to="/contact" FlyoutContent>
        <p>contact</p>
      </FlyOut>
      <FlyOut to="/Shop" FlyoutContent>
        <p>Shop</p>
      </FlyOut>
    </div>
  );
};

const FlyOut = ({ children, to, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <NavLink to={to} className="relative">
        {children}
        <span
          style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -bottom-2 -left-2 h-[5.5px] -right-2 
            rounded-full bg-[black] transition-all
           duration-300 ease-in-out dark:bg-white"
        />
      </NavLink>
    </div>
  );
};

export default NavItem;
