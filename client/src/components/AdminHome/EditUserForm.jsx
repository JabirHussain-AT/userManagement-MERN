import React, { useState, useEffect } from 'react';

const EditUserForm = ({ user, onSubmit, onCancel }) => {
  const [editedUserName, setEditedUserName] = useState('');

  useEffect(() => {
    setEditedUserName(user?.userName || '');
  }, [user]);

  const handleSubmit = () => {
    onSubmit(editedUserName);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
          <input
            type="text"
            value={editedUserName}
            onChange={(e) => setEditedUserName(e.target.value)}
            className="border-b border-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-blue-500 hover:text-blue-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
