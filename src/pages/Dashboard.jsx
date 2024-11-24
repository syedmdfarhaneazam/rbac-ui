import { useContext } from "react";
import { CtxApi } from "../context/CtxApi";
import "./Dashboard.css";

const Dashboard = () => {
  const { users } = useContext(CtxApi);
  const admins = users.filter((user) => user.role === "admin").length;
  const developers = users.filter(
    (user) => user.role === "developer",
  ).length;
  const totalUsers = users.length;
  const clients = totalUsers - admins - developers; 

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      {/* Dashboard Overview */}
      <div className="dashboard-overview">
        <div className="overview">
          <h3>Developers</h3>
          <p>{developers}</p>
        </div>
        <div className="overview">
          <h3>Admin</h3>
          <p>{admins}</p>
        </div>
        <div className="overview">
          <h3>Clients</h3>
          <p>{clients}</p>
        </div>
        <div className="overview">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <p>So here is the place admin can manage the role and see who are the developers . Upadate their work and status and address to the request of the clients</p>
      </div>
    </div>
  );
};

export default Dashboard;
