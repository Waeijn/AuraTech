// Sprint 1: Member 2
// Task: Implement basic Navbar structure for navigation.
// NOTE to Member 2: Add links to routes and integrate design from Member 1 in later sprints.

import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        {/* Member 1 will provide logo */}
        <Link to="/">AuraTech</Link>
      </div>

      <nav className="navbar__links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
