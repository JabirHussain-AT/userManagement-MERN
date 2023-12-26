import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../hooks/customHooks";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../actions/userActions";

const LoginForm = ({setErrorMessage}) => {
  const dispatch = useDispatch();
  const [formData, setFormData, handleChange] = useFormData();
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(() => {
      return { email: "", password: "" };
    });
  }, []);

  const { email, password } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmailPattern = emailRegex.test(email);
  const passwordPattern = /^[^\s]{6,}$/;
  const validPassword = passwordPattern.test(password);
  const handleError = (err)=>{
    setErrorMessage(err)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !validEmailPattern) {
      setEmailState(true);
      setTimeout(() => {
        setEmailState(false);
      }, 3000);
    }

    if (!password.trim() || !validPassword) {
      setPasswordState(true);
      setTimeout(() => {
        setPasswordState(false);
      }, 3000);
    }

    if (email.trim() && validEmailPattern && password.trim() && validPassword) {
      dispatch(userLogin({ email, password, handleError, navigate }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-600 text-sm font-medium"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`mt-1 p-2 w-full border rounded-md ${
            emailState ? "border-red-500" : ""
          }`}
        />
        {emailState && (
          <span className="text-red-500">Please enter a valid email.</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-600 text-sm font-medium"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          className={`mt-1 p-2 w-full border rounded-md ${
            passwordState ? "border-red-500" : ""
          }`}
        />
        {passwordState && (
          <span className="text-red-500">
            Password must be at least 6 characters long.
          </span>
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-500  text-white p-2 px-32 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
