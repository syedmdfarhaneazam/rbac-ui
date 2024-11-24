import { useContext } from "react";
import { CtxApi } from "../context/CtxApi";
import "./Dashboard.css";

const Dashboard = () => {
  const { users, roles } = useContext(CtxApi);

  // Example calculations
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive",
  ).length;
  const totalUsers = users.length;
  const totalRoles = roles.length;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Inactive Users</h3>
          <p>{inactiveUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Roles</h3>
          <p>{totalRoles}</p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="recent-users">
        <h3>Recent Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 5).map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Roles Table */}
      <div className="recent-roles">
        <h3>Recent Roles</h3>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.slice(0, 5).map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions?.join(", ") || "No permissions"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
