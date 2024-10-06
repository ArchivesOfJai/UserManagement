import React, { useState } from 'react';
import axios from 'axios';
import './CreateUserForm.css';

const CreateUserForm = ({ handleCreate,users }) => {
 
  const [userData, setUserData] = useState({id:users.length+1, name: '', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.name.length < 3 || !/\S+@\S+\.\S+/.test(userData.email) || userData.phone.length < 10) {
      alert('Invalid form input'); return;
    }
    if(users.find(user => user.email === userData.email)){alert('user already exists'); return;}
    axios.post('https://jsonplaceholder.typicode.com/users', userData)
    .then(res =>{ 
    setUserData({id:'', name: '', email: '', phone: ''});
    alert('User created successfully');
    handleCreate(res.data);
      })
      .catch(err => alert('Error creating user'));
  };

  return (
    <form className='new-user-form flex-column flex-md-row justify-content-center gap-1 py-3' onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={e => setUserData({ ...userData, name: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={e => setUserData({ ...userData, email: e.target.value })} required />
      <input type="tel" placeholder="Phone" onChange={e => setUserData({ ...userData, phone: e.target.value })} required />
      <button className='btn rounded-pill btn-primary' type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
