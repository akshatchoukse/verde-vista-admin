import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://menu-escape.onrender.com/api/order")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOrder = (id, status) => {
    axios
      .put(`https://menu-escape.onrender.com/api/order/${id}`, {
        status: status,
      })
      .then((res) => {
        alert(res.data);
        getData();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
      </div>

      {loading && <p className="mb-4 text-gray-600">Loading orders...</p>}
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table
            className="min-w-full"
            aria-label="Order management table"
            role="table"
          >
            <thead className="bg-gray-50">
              <tr>
                {[
                  "S.No",
                  "Table.no",
                  "Name",
                  "Food Items",
                  "Price",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}

              {allOrders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4">{order.table}</td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside space-y-1">
                      {order.orderedFood.map((food, i) => (
                        <li key={`${food.name}-${i}`} className="flex gap-2">
                          <span>{food.name}</span> -{" "}
                          <span>₹{food.price}</span> -{" "}
                          <span>Qty: {food.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    ₹
                    {order.orderedFood
                      .map((item) => item.price * item.quantity)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleOrder(order._id, "Completed")}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => handleOrder(order._id, "Cancelled")}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                      Cancelled
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
