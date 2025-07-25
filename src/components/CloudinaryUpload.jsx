import React, { useState } from 'react';
// import { FiUpload, FiImage, FiCheck, FiCopy } from 'react-icons/fi';


const CloudinaryUpload = ({setFoodObj, foodObj}) => {
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
      setFoodObj({...foodObj, image: data.secure_url})
      setImageUrl(data.secure_url);

      setPreview(data.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <>
          <p><strong>Image URL:</strong> {imageUrl}</p>
          <img src={preview} alt="Uploaded preview" width="200" />
        </>
      )}
    </div>
  );
};

export default CloudinaryUpload;
