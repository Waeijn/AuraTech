// Sprint 1: Member 2
// Task: Basic Footer structure for site layout.
// NOTE to Member 2: Footer styling controlled by Member 5.

import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Left: Brand / Logo / Tagline */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/img/logo/LOGO.png" alt="AuraTech Logo" />
            <h3>AuraTech</h3>
          </div>
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
