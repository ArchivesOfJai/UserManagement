import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, handleUpdate }) => {
  const [userData, setUserData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, userData)
      .then(res => handleUpdate(res.data))
      .catch(err => alert('Error updating user'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} required />
      <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} required />
      <input type="tel" value={userData.phone} onChange={e => setUserData({ ...userData, phone: e.target.value })} required />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUserForm;
