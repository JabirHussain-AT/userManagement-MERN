import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, fetchUsers, userDelete } from '../../actions/adminActions';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { editUser } from '../../actions/adminActions';
import EditUserForm from '../../components/AdminHome/EditUserForm'; 
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state?.users);
  const error = useSelector((state) => state.error);
  const usersData = users?.users;
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, successMessage]);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
  };

  const handleEditSubmit = (editedUserName, oldName) => {
    if (editedUserName === oldName) {
      handleError("It's the same name, so not updated");
      setSelectedUserId(null);
    } else {
      console.log(`Submitting edited user name for ID ${selectedUserId}: ${editedUserName}`);
      dispatch(editUser({ selectedUserId, editedUserName }, handleSuccess, handleError));
      setSelectedUserId(null);
    }
  };

  const handleCancelEdit = () => {
    setSelectedUserId(null);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage('');
    setSelectedUserId(null);
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    
    if (confirmDelete) {
      console.log(`Deleting user with ID: ${userId}`);
      userDelete(userId, setSuccessMessage, setErrorMessage);
    } else {
      console.log('Delete operation canceled.');
    }
  };

  const handleAddUser = () => {
    navigate('/admin/add-user');
  };

  const handleLogout = () => {
    dispatch(adminLogout(navigate))
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = usersData?.user?.filter(user => user.userName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-300 h-screen">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-4 text-white px-5 font-mono">Users</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-2 py-1 border border-gray-300 rounded-md pr-8"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button onClick={handleLogout} className='py-2 px-5 mr-5 bg-black text-white text-center rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:shadow-outline-green'>Logout</button>
          <button onClick={handleAddUser} className='py-2 px-5 bg-green-600 text-white text-center rounded-md transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none focus:shadow-outline-green'>Add User</button>
        </div>
      </div>
        
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center m-2">{errorMessage}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b w-1/5">User ID</th>
            <th className="py-2 px-4 border-b w-3/5">Email</th>
            <th className="py-2 px-4 border-b w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.length > 0 ? (
            filteredUsers?.map((user) => (
              <tr key={user._id} className="bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">
                  {selectedUserId === user._id ? (
                    <EditUserForm
                      user={user}
                      onSubmit={(editedUserName) => handleEditSubmit(editedUserName, user?.userName)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    user.userName
                  )}
                </td>
                <td className="py-2 px-4 border-b flex items-center space-x-2">
                  {selectedUserId === user._id ? (
                    null
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="text-blue-500 mr-5 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-white">
                No Users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
