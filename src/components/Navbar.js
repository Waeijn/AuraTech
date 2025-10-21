// Sprint 1: Member 2
// Task: Implement basic Navbar structure for navigation.

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <img src="/img/logo/LOGO.png" alt="Logo" />
          <Link to="/">AuraTech</Link>
        </div>

        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

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