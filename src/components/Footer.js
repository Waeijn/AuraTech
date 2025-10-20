// Sprint 1: Member 2
// Task: Basic Footer structure for site layout.
// NOTE to Member 2: Footer styling controlled by Member 5.

import "../styles/navbar.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Left: Brand / Tagline */}
        <div className="footer__brand">
          <h3>AuraTech</h3>
          <p>Gaming Gear — Built for Performance</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="footer__links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/cart">Cart</a>
          <a href="/checkout">Checkout</a>
        </div>

        {/* Bottom: Copyright */}
        <div className="footer__copy">
          <p>© {new Date().getFullYear()} AuraTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
