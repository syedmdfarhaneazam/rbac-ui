import { useState, useEffect } from "react";
import "./components.css";

const RoleManagement = () => {
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch roles from the JSON Server
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles");
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const data = await response.json();
        setRoleList(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roleList.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
