import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import { useContext } from "react";
import { AuthContext } from "./store/AuthContext"; //hte the context for futher use once done wirth login

export default function App() {
  const { authDetails } = useContext(AuthContext);
  console.log("Got this detail from context  :-> ", authDetails);
  return (
    <div>
      <RoleManagement />
      <UserManagement />
    </div>
  );
}
