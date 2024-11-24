// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./pages/Navbar";
// import Dashboard from "./pages/Dashboard";
// import UserManagement from "./pages/UserManagement";
// import RoleManagement from "./pages/RoleManagement";
import { useContext } from 'react';
import Developer from './Developer.jsx';
import Client from './Client.jsx';
import Admin from './Admin';
import { CtxApi } from './context/CtxApi.jsx';

const App = () => {
  const { currentUser } = useContext(CtxApi);

  return (
    <div>
      {currentUser === 'Admin' && <Admin />}
      {currentUser === 'Developer' && <Developer />}
      {currentUser === 'Client' && <Client />}
    </div>
  );
};

export default App;
