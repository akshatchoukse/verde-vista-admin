import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white text-gray-800 px-8 py-4 shadow-md border-b border-gray-300">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-indigo-700">
          Admin Panel
        </h1>
        <label className="text-[13px] font-extrabold tracking-tight text-indigo-700">Verde Vista</label>
      </div>

      <div className="flex items-center space-x-8">
        <div className="relative group cursor-pointer">
          <FaBell className="text-2xl text-gray-600 transition-colors duration-300 group-hover:text-indigo-600" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            1
          </span>
        </div>
        <div className="cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors duration-300">
          <FaUserCircle className="text-3xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
