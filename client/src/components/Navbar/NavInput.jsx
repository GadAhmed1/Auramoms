/* eslint-disable no-unused-vars */
import React from "react";
import { IoIosSearch } from "react-icons/io";
const NavInput = () => {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="border-b-2 outline-none p-2 pl-10 w-full"
          placeholder="Search..."
        />
        <IoIosSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
};

export default NavInput;
