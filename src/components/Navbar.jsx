import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4 text-white">
    <div className="flex justify-between">
      <h1 className="text-lg font-bold">RBAC UI</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/roles">Roles</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;

