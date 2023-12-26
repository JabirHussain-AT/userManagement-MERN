import { useState, useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "./actions/userActions";
import Profile from "./pages/Profile";

function App() {
  const BACKEND_BASE_URL = "http://localhost:3002";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
            console.log(response.success, "let's check it ", user.isAuthenticated);
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
  }, [user, dispatch]);

  if (loading) {
    // You can show a loading spinner or any other UI while waiting for the response
    return <div className="text-center font-bold font-mono text-blue-950 text-lg">Loading...</div>;
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
              <Route path="/profile" element={<Profile/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
