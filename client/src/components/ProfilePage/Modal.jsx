// UploadModal.js
import React, { useState } from 'react';
import Modals from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state)=>state.user)

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
      console.log(formData,'form data')
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
    >
      <h2>Upload Profile Picture</h2>
      <input name='image' type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={closeModal}>Close Modal</button>
    </Modals>
  );
};

export default Modal;
