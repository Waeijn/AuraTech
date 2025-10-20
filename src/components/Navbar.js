// Sprint 1: Member 2
// Task: Implement basic Navbar structure for navigation.
// NOTE to Member 2: Add links to routes and integrate design from Member 1 in later sprints.

import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo / Brand */}
        <div className="navbar__brand">
          {/* Member 1 will provide logo */}
          <Link to="/">AuraTech</Link>
        </div>

        {/* Search Bar */}
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>

        {/* Navigation Links */}
        <nav className="navbar__links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
          <Link to="/checkout" className="nav-link">
            Checkout
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
