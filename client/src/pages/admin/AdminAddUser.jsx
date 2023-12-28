import React, { useState } from "react";
import SignupForm from "../../components/SignupPage/SignupForm";
import { userAdding } from "../../actions/adminActions";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-300">
      <div className="bg-gray-300 p-8 rounded-md shadow-md w-96">
      <h1 className='text-center text-xl font-mono font-bold'>Add User</h1>
        {errorMessage !== null ? (
          <div className="flex justify-center items-center">
            <p className="text-center text-red-600">{errorMessage}</p>
          </div>
        ) : null}
        {successMessage !== null ? (
          <div className="flex justify-center items-center">
            <p className="text-center text-green-600">{successMessage}</p>
          </div>
        ) : null}
        <SignupForm
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          action={userAdding}
        />
        <p className="my-4 mx-5">
          <span
            onClick={() => navigate("/admin")}
            className="text-blue-700  underline"
          >
            Click here{" "}
          </span>{" "}
          to go back to the dashboard
        </p>
      </div>
    </div>
  );
};

export default AddUser;
