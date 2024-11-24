import { useContext, useState, useEffect } from "react";
import { CtxApi } from "../context/CtxApi";
import "./UserM.css";

const RoleManagement = () => {
  const { roles, setRoles } = useContext(CtxApi);

  // States for adding or editing a role
  const [newRole, setNewRole] = useState({
    name: "",
    permissions: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);

  // Predefined permission options
  const permissionOptions = [
    { name: "View", permissions: ["view"] },
    { name: "View & Edit", permissions: ["view", "edit"] },
    {
      name: "View, Edit, Create, Delete",
      permissions: ["view", "edit", "create", "delete"],
    },
  ];

  // Load roles from localStorage on component mount
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
  }, [setRoles]);

  // Update localStorage whenever roles change
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  // Handle permission selection
  const handlePermissionChange = (e) => {
    const value = e.target.value;
    setNewRole({ ...newRole, permissions: value });
  };

  // Handle adding or updating a role
  const handleSaveRole = () => {
    if (!newRole.name || !newRole.permissions) {
      alert("Please provide both role name and permissions.");
      return;
    }

    const selectedPermissions =
      permissionOptions.find((option) => option.name === newRole.permissions)
        ?.permissions || [];

    // Check for duplicate role names
    const isDuplicate = roles.some(
      (role) =>
        role.name.toLowerCase() === newRole.name.toLowerCase() &&
        role.id !== editingRoleId,
    );
    if (isDuplicate) {
      alert("Role name already exists.");
      return;
    }

    if (isEditing) {
      // Update the role
      const updatedRoles = roles.map((role) =>
        role.id === editingRoleId
          ? { ...role, name: newRole.name, permissions: selectedPermissions }
          : role,
      );
      setRoles(updatedRoles);
      setIsEditing(false);
      setEditingRoleId(null);
    } else {
      // Add a new role
      const newRoleObject = {
        id: Date.now(),
        name: newRole.name,
        permissions: selectedPermissions,
      };
      setRoles([...roles, newRoleObject]);
    }
    setNewRole({ name: "", permissions: "" });
  };

  // Handle editing a role
  const handleEditRole = (roleId) => {
    const roleToEdit = roles.find((role) => role.id === roleId);
    if (roleToEdit) {
      const selectedOption = permissionOptions.find(
        (option) =>
          JSON.stringify(option.permissions) ===
          JSON.stringify(roleToEdit.permissions),
      );
      setNewRole({
        name: roleToEdit.name,
        permissions: selectedOption?.name || "",
      });
      setIsEditing(true);
      setEditingRoleId(roleId);
    }
  };

  // Handle deleting a role
  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      const updatedRoles = roles.filter((role) => role.id !== roleId);
      setRoles(updatedRoles);
    }
  };

  return (
    <div className="role-management-container">
      <h2>Roles Management Area</h2>
      <div className="add-role-form">
        <h3>{isEditing ? "Edit Role" : "Add New Role"}</h3>
        <input
          type="text"
          name="name"
          value={newRole.name}
          placeholder="New User Name"
          onChange={handleInputChange}
        />

        <select
          name="permissions"
          value={newRole.permissions}
          onChange={handlePermissionChange}
        >
          <option value="" disabled>
            Select Permissions
          </option>
          {permissionOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <button onClick={handleSaveRole}>
          {isEditing ? "Save Changes" : "Add Role"}
        </button>
      </div>

      {/* Roles Table */}
      <div className="roles-table styled-table">
        <h3>Roles given to different people</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(", ")}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditRole(role.id)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteRole(role.id)}
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

export default RoleManagement;
