import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search input

  // Fetch users from API when component mounts
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => alert('Error fetching users'));
  }, []);

  const handleCreate = (newUser) => {
    newUser.id = users.length + 1;
    setUsers([...users, newUser]);
  };

  const handleUpdate = (updatedUser) => setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(err => alert('Error deleting user'));
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-md text-center py-3 position-relative">
        <h1 className='py-3 user-management'>User Management</h1>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          className="form-control my-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />

        <CreateUserForm handleCreate={handleCreate} users={users} />
        <table className="mx-auto gap-2 text-start table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render filtered users */}
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <tr key={user.id}>
                <td data-label='Name'>{user.name}</td>
                <td data-label='Email'>{user.email}</td>
                <td data-label='Phone'>{user.phone}</td>
                <td>
                  <button className='btn btn-primary m-1' onClick={() => setEditUser(user)}>Edit</button>
                  <button className='btn btn-primary m-1' onClick={() => handleDelete(user.id)}>Delete</button>
                  <Link to={`/user/${user.id}`}>View</Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        {editUser && <EditUserForm user={editUser} handleUpdate={handleUpdate} setEditUser={setEditUser} />}
      </div>
    </>
  );
};

export default UserList;
