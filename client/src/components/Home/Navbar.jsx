import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../actions/userActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(userLogout(navigate));
    }
  };
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <div>
        <span className="text-2xl font-bold">myUsers</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/profile")}
          className="hover:text-gray-300"
        >
          Profile
        </button>
        <button onClick={handleLogout} className="hover:text-gray-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
