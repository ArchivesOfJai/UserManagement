import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = ({ handleCreate }) => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.name.length < 3 || !/\S+@\S+\.\S+/.test(userData.email) || userData.phone.length < 10) {
      alert('Invalid form input'); return;
    }
    axios.post('https://jsonplaceholder.typicode.com/users', userData)
      .then(res => handleCreate(res.data))
      .catch(err => alert('Error creating user'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={e => setUserData({ ...userData, name: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={e => setUserData({ ...userData, email: e.target.value })} required />
      <input type="tel" placeholder="Phone" onChange={e => setUserData({ ...userData, phone: e.target.value })} required />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
