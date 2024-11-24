import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Toggle mobile menu state
  const toggleMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  // Close menu on link click (for mobile view)
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="navbar-logo">ADMIN</h1>

        {/* Hamburger Icon */}
        <button
          className="navbar-hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className={isActive("/") ? "active-link" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              onClick={closeMenu}
              className={isActive("/users") ? "active-link" : ""}
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              onClick={closeMenu}
              className={isActive("/roles") ? "active-link" : ""}
            >
              Manage Roles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
