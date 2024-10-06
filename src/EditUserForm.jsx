import React, { useState } from "react";
import axios from "axios";
import "./EditUserForm.css";
const EditUserForm = ({ user, handleUpdate,setEditUser }) => {
  const [userData, setUserData] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, userData)
      .then((res) => {handleUpdate(res.data);
        setEditUser(null);
      })
      .catch((err) => alert("Error updating user"));
    
  };

  const handleCLose = () => {
    setEditUser(null);
  };

  return (
    <div className="edit-user-form">
      <form
        className="d-flex flex-column justify-content-center align-items-center gap-3 h-100 position-relative"
        onSubmit={handleSubmit}
      >
      <button onClick={handleCLose} type="button" class="btn-close" aria-label="Close"></button>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Name
          </span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Email
          </span>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            Contact no.
          </span>
          <input
            type="tel"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            required
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <button className="btn rounded-pill btn-primary" type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserForm;
