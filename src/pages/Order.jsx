import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://menu-escape.onrender.com/api/order")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOrder = (id, status) => {
    axios
      .put(`https://menu-escape.onrender.com/api/order/${id}`, { status })
      .then((res) => {
        alert(res.data);
        getData();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center">
          Order Management
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 shadow-sm rounded-md">
            <thead className="bg-indigo-100">
              <tr>
                {[
                  "S.No",
                  "Table No",
                  "Name",
                  "Food Items",
                  "Price",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allOrders.length > 0 ? (
                allOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-indigo-50 transition-colors duration-150"
                  >
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-indigo-900 font-semibold">
                      {order.table}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {order.name}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm">
                      <ul className="space-y-1">
                        {order.orderedFood.map((food, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between px-3 py-1 rounded-md bg-indigo-50"
                          >
                            <span className="font-medium">{food.name}</span>
                            <span>Price: ₹{food.price}</span>
                            <span>Qty: {food.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm font-semibold text-indigo-900">
                      ₹
                      {order.orderedFood
                        .map((f) => f.price * f.quantity)
                        .reduce((a, b) => a + b, 0)}
                    </td>
                    <td
                      className={`border border-gray-300 px-6 py-4 text-sm font-semibold ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 flex gap-3 justify-center">
                      <button
                        onClick={() => handleOrder(order._id, "Completed")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm font-semibold shadow-sm transition"
                        title="Mark Completed"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleOrder(order._id, "Cancelled")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-semibold shadow-sm transition"
                        title="Mark Cancelled"
                      >
                        Cancelled
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-400 italic text-sm"
                  >
                    No order found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
