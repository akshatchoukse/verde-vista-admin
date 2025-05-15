import React from "react";
import {
  FiHome,
  FiCoffee,
  FiClipboard,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-100 text-gray-700 w-full shadow-md z-50">
      <ul className="flex justify-around py-3 sm:py-4">
        <li
          onClick={() => navigate("/")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-yellow-600 transition duration-300"
          title="Dashboard"
          role="button"
          tabIndex={0}
        >
          <FiHome className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Dashboard</span>
        </li>
        <li
          onClick={() => navigate("/product")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-yellow-600 transition duration-300"
          title="Food Item"
          role="button"
          tabIndex={0}
        >
          <FiCoffee className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Food Item</span>
        </li>
        <li
          onClick={() => navigate("/order")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-yellow-600 transition duration-300"
          title="Order"
          role="button"
          tabIndex={0}
        >
          <FiClipboard className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Order</span>
        </li>
        <li
          className="flex flex-col items-center cursor-pointer p-2 hover:text-cyan-600 transition duration-300"
          title="Settings"
          role="button"
          tabIndex={0}
        >
          <FiSettings className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Settings</span>
        </li>
        <li
          className="flex flex-col items-center cursor-pointer p-2 hover:text-red-600 transition duration-300"
          title="Logout"
          role="button"
          tabIndex={0}
        >
          <FiLogOut className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
