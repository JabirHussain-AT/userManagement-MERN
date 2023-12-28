import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../hooks/customHooks";
import { useSelector, useDispatch } from "react-redux";
import { userSignup } from "../../actions/userActions";

const SignupForm = ({ setErrorMessage ,setSuccessMessage , action}) => {
  const dispatch = useDispatch();
  const [formData, setFormData, handleChange] = useFormData();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(() => {
      return { userName: "", email: "", password: "", confirmPassword: "" };
    });
  }, []);

  const { userName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmailPattern = emailRegex.test(email);
    const passwordPattern = /^[^\s]{6,}$/;

    // Validate required fields
    if (!userName.trim()) {
      errors.userName = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validEmailPattern) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordPattern.test(password)) {
      errors.password = "Password must be at least 6 characters long and should not contain spaces";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }

    // Validate password match
    if (password.trim() !== confirmPassword.trim()) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(action(formData,setSuccessMessage, setErrorMessage, navigate));
    } else {
      setErrorMessage("Please fix the errors in the form.");

      // Clear error message after 4 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="block mb-4">
        Name:
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={userName}
          onChange={(e) => handleChange("userName", e.target.value)}
        />
        {errors.userName && <span className="text-red-500">{errors.userName}</span>}
      </label>
      <label className="block mb-4">
        Email:
        <input
          type="email"
          className="w-full border p-2 rounded-md"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </label>
      <label className="block mb-4">
        Password:
        <input
          minLength={6}
          type="password"
          className="w-full border p-2 rounded-md"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </label>
      <label className="block mb-4">
        Confirm Password:
        <input
          minLength={6}
          type="password"
          className="w-full border p-2 rounded-md"
          value={confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
      >
        Next
      </button>
    </form>
  );
};

export default SignupForm;
