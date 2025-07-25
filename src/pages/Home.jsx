import axios from "axios";
import React, { useEffect, useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload";
const Home = () => {const [foodObj, setFoodObj] = useState({
    foodName: "",
    category: "",
    price: "",
    image: "",
  });
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData();
    // Close modal on Escape key press
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getData = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://menu-escape.onrender.com/api/foodItem")
      .then((res) => {
        setAllFoodItems(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Images.");
      })
      .finally(() => setLoading(false));
  };

  const postData = () => {
    // Basic validation
    if (
      !foodObj.foodName.trim() ||
      !foodObj.category.trim() ||
      !foodObj.price.trim() ||
      !foodObj.image.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }
    axios
      .post("https://menu-escape.onrender.com/api/foodItem", foodObj)
      .then((res) => {
        alert(res.data);
        setShowModal(false);
        setFoodObj({ foodName: "", category: "", price: "", image: "" });
        getData();
      })
      .catch((err) => alert("Error: " + err.message));
  };
  console.log(foodObj)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add New Product
        </button>
      </div>

      {loading && <p className="mb-4 text-gray-600">Loading food items...</p>}
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full" role="table" aria-label="Food items table">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "S.No",
                  "Category",
                  "Name",
                  "Image",
                  "Price",
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
              {allFoodItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                    No food items found.
                  </td>
                </tr>
              )}
              {allFoodItems.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.foodName}</td>
                  <td className="px-6 py-4">
                    <img
                      className="h-[10vh] object-cover rounded"
                      src={item.image}
                      alt={item.foodName}
                    />
                  </td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                      onClick={() => alert("Edit feature coming soon!")}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl relative z-10">
            <h2 id="modal-title" className="text-xl font-bold mb-4">
              Add New Food Item
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  value={foodObj.foodName}
                  onChange={(e) =>
                    setFoodObj({ ...foodObj, foodName: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={foodObj.category}
                  onChange={(e) =>
                    setFoodObj({ ...foodObj, category: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  value={foodObj.price}
                  onChange={(e) =>
                    setFoodObj({ ...foodObj, price: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <CloudinaryUpload setFoodObj={setFoodObj} foodObj={foodObj}></CloudinaryUpload>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={postData}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
