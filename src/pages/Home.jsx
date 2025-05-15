import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setLoading(true);
    setError(null);
    axios
      .get('https://menu-escape.onrender.com/api/user')
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch user data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Customer Details</h1>

      {loading && (
        <p className="mb-4 text-gray-600">Loading customer data...</p>
      )}

      {error && (
        <p className="mb-4 text-red-600 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">RECENT</h2>
          <table
            className="min-w-full border-collapse"
            aria-label="Recent customer transactions"
          >
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left border-b">Name</th>
                <th className="py-3 px-4 text-left border-b">Contact No.</th>
                <th className="py-3 px-4 text-left border-b">Table</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No customer data available.
                  </td>
                </tr>
              ) : (
                allUsers.map((user) => (
                  <tr
                    key={user._id || user.number || user.name}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">+91 {user.number}</td>
                    <td className="py-2 px-4">{user.tableNo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
