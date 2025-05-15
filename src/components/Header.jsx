import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 text-gray-800 p-4 shadow-md">
      <div className="flex items-center space-x-3 mb-3 sm:mb-0">
        <h1 className="text-2xl font-semibold select-none">Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-6">
        <FiBell
          className="text-xl sm:text-2xl cursor-pointer transition-colors duration-300 hover:text-yellow-500"
          title="Notifications"
          aria-label="Notifications"
        />
        <FiUser
          className="text-2xl sm:text-3xl cursor-pointer transition-colors duration-300 hover:text-cyan-500"
          title="User Profile"
          aria-label="User Profile"
        />
      </div>
    </header>
  );
};

export default Header;
