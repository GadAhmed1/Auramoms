import { useState } from "react";
import {
  BsCardList,
  BsCardChecklist,
  BsPlusSquare,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`min-h-screen border-r border-slate-900/10 transition-all duration-300 ${
        isCollapsed ? "w-[4rem]" : "w-1/5"
      }`}
    >
      {/* زر لتصغير وتكبير الشريط الجانبي */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-700"
        >
          {isCollapsed ? (
            <BsChevronRight size={24} />
          ) : (
            <BsChevronLeft size={24} />
          )}
        </button>
      </div>

      <div className="flex flex-col gap-10 pt-4 sm:pt-10 pl-4">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsPlusSquare />
          {!isCollapsed && <p className="hidden lg:flex">Add Items</p>}
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsCardList />
          {!isCollapsed && <p className="hidden lg:flex">List Items</p>}
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsCardChecklist />
          {!isCollapsed && <p className="hidden lg:flex">Order Items</p>}
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
