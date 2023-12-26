import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userEdit } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Card = ({ userData, openModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditClick = () => {
    setEditStatus(true);
    setNewName(userData?.userName || "");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSuccess = () => {
    setSuccessMessage("Successfully updated!");
    setErrorMessage("");
    setEditStatus(false);
  };

  const handleError = () => {
    setSuccessMessage("");
    setErrorMessage("Failed to update. Please try again.");
  };

  const handleSubmit = () => {
    if (newName.trim() !== "") {
      dispatch(userEdit({newName, userData, handleSuccess, handleError}));
    } else {
      setSuccessMessage("");
      setErrorMessage("Name cannot be empty!");
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex items-center mb-6">
          <div className="mr-8">
            <img
              src={`http://localhost:3002/uploads/${userData?.profilePic}`}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover shadow-md cursor-pointer"
              onClick={openModal}
            />
            <div className="text-center mt-2" onClick={openModal}>
              <FaEdit className="cursor-pointer"  />Edit Profile Picture
            </div>
          </div>

          <div>
            {editStatus ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-b border-gray-500 mb-2"
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold">{userData?.userName}</h2>
                <div className="text-gray-600">Email: {userData?.email}</div>
              </>
            )}
          </div>
        </div>

        <div className="mb-2 text-green-500">{successMessage}</div>
        <div className="mb-2 text-red-500">{errorMessage}</div>

        {editStatus ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit user name
          </button>
        )}
        <button onClick={()=>navigate('/')} className="bg-black text-white px-4 ml-5 py-2 rounded-md">
            Back to Home
        </button>
      </div>
    </>
  );
};

export default Card;
