// UploadModal.js
import React, { useState } from 'react';
import Modals from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Make an Axios request to upload the image
      const response = await axios.post(`http://localhost:3002/profilePic/${user?.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Modals
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Profile Picture Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '300px',
          margin: 'auto',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
        },
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Upload Profile Picture</h2>
        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <input name="image" type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
        Upload
      </button>
      <button onClick={closeModal} className="border border-gray-300 py-2 px-4 rounded-md">
        Close Modal
      </button>
    </Modals>
  );
};

export default Modal;
