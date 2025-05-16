import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://menu-escape.onrender.com/api/user")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center">
          Customer Details
        </h1>

        <div className="bg-indigo-50 rounded-md p-6 shadow-inner">
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">Recent Customers</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto border border-gray-200 shadow-sm rounded-md">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    S.no
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    Contact No.
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                    Table
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.length > 0 ? (
                  allUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-indigo-900">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                        +91 {user.number}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-indigo-800 font-semibold">
                        {user.table}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-gray-400 italic text-sm"
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
