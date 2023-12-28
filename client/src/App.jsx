import { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { setUser } from "./actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import AdminLogin from "./pages/admin/adminLogin";
import { setAdmin } from "./actions/adminActions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import axios from "axios";
import Profile from "./pages/Profile";
import AdminHome from "./pages/admin/AdminHome";
import AddUser from "./pages/admin/AdminAddUser";

function App() {
  const BACKEND_BASE_URL = "http://localhost:3002";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.isAuthenticated) {
      axios
        .get(`${BACKEND_BASE_URL}/check-auth`, {
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            console.log(
              response.success,
              "let's check it ",
              user.isAuthenticated
            );
            dispatch(
              setUser({
                userId: response?.userData?._id,
                name: response?.userData?.userName,
              })
            );
          }
        })
        .finally(() => setLoading(false));
    }
    if (!admin.isAuthenticated) {
      axios
        .get(`${BACKEND_BASE_URL}/admin/check-auth`, {
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            dispatch(
              setAdmin({
                adminId: response?.adminId,
                name: response?.name,
              })
            );
            console.log(response, "let's check it ", admin.isAuthenticated);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, admin, dispatch]);

  if (loading) {
    // You can show a loading spinner or any other UI while waiting for the response
    return (
      <div className="text-center font-bold font-mono text-blue-950 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          {!user.isAuthenticated ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {!admin.isAuthenticated ? (
            <>
              <Route path="/admin" element={<AdminLogin />} />
            </>
          ) : (
            <>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/dashboard" element={<AdminHome />} />
              <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
