import axios from "axios";
import React, { useEffect, useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload";

const Home = () => {
  const [imageObj, setImageObj] = useState({
    title: "",
    category: "",
    image: "",
  });
  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getData();
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
      .get("https://verde-vista-backend.onrender.com/api/gallery")
      .then((res) => setAllImage(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load Images.");
      })
      .finally(() => setLoading(false));
  };

  const postData = () => {
    if (!imageObj.title.trim() || !imageObj.category.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const method = isEditMode ? "put" : "post";
    const url = isEditMode
      ? `https://verde-vista-backend.onrender.com/api/gallery/${editId}`
      : "https://verde-vista-backend.onrender.com/api/gallery";

    axios[method](url, imageObj)
      .then((res) => {
        alert(res.data);
        setShowModal(false);
        setImageObj({ title: "", category: "", image: "" });
        setIsEditMode(false);
        setEditId(null);
        getData();
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      axios
        .delete(`https://verde-vista-backend.onrender.com/api/gallery/${id}`)
        .then(() => getData())
        .catch((err) => alert("Error deleting image: " + err.message));
    }
  };

  const handleEdit = (item) => {
    setImageObj({
      title: item.title,
      category: item.category,
      image: item.image,
    });
    setEditId(item._id);
    setIsEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Image Management</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setImageObj({ title: "", category: "", image: "" });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add New Image
        </button>
      </div>

      {loading && <p className="mb-4 text-gray-600">Loading Images...</p>}
      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {["S.No", "Title", "Category", "Image", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allImage.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No Image found.
                  </td>
                </tr>
              )}
              {allImage.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{item.title}</td>
                  <td className="px-4 py-4">{item.category}</td>
                  <td className="px-4 py-4">
                    <img
                      className="h-[20vw] md:h-[10vh] object-cover rounded"
                      src={item.image}
                      alt={item.title}
                    />
                  </td>
                  <td className="px-4 py-4 space-y-2 md:space-y-0 md:space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto relative z-10">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Image" : "Add New Image"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Image Title
                </label>
                <input
                  type="text"
                  value={imageObj.title}
                  onChange={(e) =>
                    setImageObj({ ...imageObj, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g. Farm View"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={imageObj.category}
                  onChange={(e) =>
                    setImageObj({ ...imageObj, category: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a category</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Infinity Pool">Infinity Pool</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Dining">Dining</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Upload Image
                </label>
                <CloudinaryUpload
                  setImageObj={setImageObj}
                  imageObj={imageObj}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-end md:space-x-3 space-y-2 md:space-y-0 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                  setImageObj({ title: "", category: "", image: "" });
                }}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 w-full md:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={postData}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
