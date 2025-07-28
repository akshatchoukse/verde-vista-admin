import React, { useState } from 'react';
// import { FiUpload, FiImage, FiCheck, FiCopy } from 'react-icons/fi';


const CloudinaryUpload = ({setImageObj, imageObj}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_unsigned_preset'); // Replace with your upload preset
    formData.append('cloud_name', 'dercgvfuo'); // Optional

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dercgvfuo/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data)
      setImageObj({...imageObj, image: data.secure_url})
      setImageUrl(data.secure_url);
      setPreview(data.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">
    Drag Image
  </h2>
  <input
    type="file"
    accept="image/*"
    onChange={handleUpload}
    className="block w-full text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100 transition"
  />

  {loading && (
    <p className="mt-3 text-blue-600 font-medium animate-pulse">
      Uploading...
    </p>
  )}

  {imageUrl && (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">
        <strong>Image URL:</strong>{' '}
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {imageUrl}
        </a>
      </p>
      <img
        src={preview}
        alt="Uploaded Preview"
        className="w-48 h-32 object-cover rounded-lg border shadow-sm"
      />
    </div>
  )}
</div>

  );
};

export default CloudinaryUpload;
