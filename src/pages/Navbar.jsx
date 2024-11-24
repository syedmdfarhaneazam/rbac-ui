import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">RBAC</h1>

        {/* Hamburger Icon */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" onClick={() => setIsMobileMenuOpen(false)}>
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/roles" onClick={() => setIsMobileMenuOpen(false)}>
              Manage Roles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
