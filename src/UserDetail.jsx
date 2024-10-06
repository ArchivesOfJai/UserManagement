import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => alert('Error fetching user details'));
  }, [id]);

  return user ? (
    <div className='container-md py-3'>
      <h2 className='fw-bold mt-3'style={{ color: '#001F3F' }}>{user.name}</h2>
      <p><span className='fw-bold' style={{ color: '#C96868' }}>Email:</span> {user.email}</p>
      <p><span className='fw-bold' style={{ color: '#C96868' }}>Phone:</span> {user.phone}</p>
      <p><span className='fw-bold' style={{ color: '#C96868' }}>Website:</span> {user.website}</p>
    </div>
  ) : <p>Loading...</p>;
};

export default UserDetail;
