import React from "react";
import {
  MdDashboard,
  MdAddAPhoto,
  MdAssignment,
  MdStarRate,
  MdExitToApp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-100 text-gray-700 w-full shadow-md z-50">
      <ul className="flex justify-around py-3 sm:py-4">
       
        <li
          onClick={() => navigate("/")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-yellow-600 transition duration-300"
          title="Add Image"
          role="button"
          tabIndex={0}
        >
          <MdAddAPhoto className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Add Image</span>
        </li>
        <li
          onClick={() => navigate("/booking-query")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-yellow-600 transition duration-300"
          title="Bookings"
          role="button"
          tabIndex={0}
        >
          <MdAssignment className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Booking Query</span>
        </li>
        
        <li
          className="flex flex-col items-center cursor-pointer p-2 hover:text-red-600 transition duration-300"
          title="Logout"
          role="button"
          tabIndex={0}
        >
          <MdExitToApp className="text-2xl sm:text-3xl" />
          <span className="text-xs sm:text-sm mt-1 font-semibold">Logout</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
