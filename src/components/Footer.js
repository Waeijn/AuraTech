// Sprint 1: Member 2
// Task: Basic Footer structure for site layout.
// NOTE to Member 2: Footer styling controlled by Member 5.

import "../styles/navbar.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {new Date().getFullYear()} AuraTech. All rights reserved.</p>
      </div>
    </footer>
  );
}
