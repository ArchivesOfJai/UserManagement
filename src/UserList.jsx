import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => alert('Error fetching users'));
  }, []);

  const handleCreate = (newUser) => setUsers([...users, newUser]);
  const handleUpdate = (updatedUser) => setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(err => alert('Error deleting user'));
  };

  return (
    <div>
      <h1>User Management</h1>
      <CreateUserForm handleCreate={handleCreate} />
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <Link to={`/user/${user.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && <EditUserForm user={editUser} handleUpdate={handleUpdate} />}
    </div>
  );
};

export default UserList;
