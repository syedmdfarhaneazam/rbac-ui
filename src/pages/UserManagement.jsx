import { useState, useContext, useEffect } from "react";
import { CtxApi } from "../context/CtxApi";

const UserManagement = () => {
  const { users, setUsers, roles } = useContext(CtxApi); // Fetch roles from context
  const [newUser, setNewUser] = useState({
    name: "",
    status: "Active",
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

    setNewUser({ name: "", status: "Active", role: "" });
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

  return (
    <div className="user-management-container">
      <h2>Manage Users</h2>

      {/* Add/Edit User Form */}
      <div className="add-user-form">
        <h3>{editingUserId ? "Edit User" : "Add New User"}</h3>
        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Enter Name"
          onChange={handleInputChange}
        />

        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="" disabled>
            Select Role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={newUser.status}
          onChange={handleInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={handleAddOrUpdateUser}>
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <h3>Users List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditUser(user.id)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
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
