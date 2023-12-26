// Profile.js
import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "../components/ProfilePage/Modal";
import Card from "../components/ProfilePage/Card";
import { userEdit } from "../actions/userActions";

const Profile = () => {
  const BACKEND_BASE_URL = 'http://localhost:3002'
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState();
  
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/profile/${user?.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setUserData(response.user);
        }
      });
  }, [userData])
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-gray-300">
      <Card  userData={userData} openModal={openModal}/>
      <Modal isOpen={isModalOpen} closeModal={closeModal} userData={userData}/>
    </div>
  );
};

export default Profile;
