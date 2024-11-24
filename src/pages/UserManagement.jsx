import { useState, useContext, useEffect } from "react";
import { CtxApi } from "../context/CtxApi";
import './UserM.css';

const UserManagement = () => {
  const { users, setUsers } = useContext(CtxApi); // Fetch roles from context
  const [newUser, setNewUser] = useState({
    name: "",
    task: "",
    role: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, [setUsers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddOrUpdateUser = () => {
    if (!newUser.name.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    if (!newUser.role) {
      alert("Please select a role.");
      return;
    }

    const isDuplicate = users.some(
      (user) => user.name === newUser.name && user.id !== editingUserId,
    );
    if (isDuplicate) {
      alert("A user with this name already exists.");
      return;
    }

    const newUserObject = {
      id: editingUserId || users.length + 1,
      ...newUser,
    };

    const updatedUsers = editingUserId
      ? users.map((user) => (user.id === editingUserId ? newUserObject : user))
      : [...users, newUserObject];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setNewUser({ name: "", task: "Active", role: "" });
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setNewUser(userToEdit);
      setEditingUserId(userId);
    }
  };
  const types = ["Admin", "Developer", "Client"]

  return (
    <div className="user-management-container">
      <h2>User Management area</h2>

      {/* Add/Edit User Form */}
      <div className="add-user-form">
        <h3>{editingUserId ? "Edit User" : "Add New User"}</h3>

        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Enter Name"
          onChange={handleInputChange} // Correctly pass the function here
        />

        <input
          type="text"
          name="task" // Updated to correctly represent "task"
          value={newUser.task}
          placeholder="Give Task to the new user"
          onChange={handleInputChange} // Correctly pass the function here
        />

        <input
          type="text"
          name="request" // Updated to correctly represent "request"
          value={newUser.request}
          placeholder="Assign a new request if you want to"
          onChange={handleInputChange} // Correctly pass the function here
        />

        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="" disabled>
            Select Role
          </option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button onClick={handleAddOrUpdateUser}>
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </div>

      <div className="users-table styled-table">
        <h3>The Existing Users List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Task Assigned</th>
              <th>Request</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.task}</td>
          <td>{user.request}</td>
          <td>
            <button className="btn-edit" onClick={() => handleEditUser(user.id)}>
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserManagement;
