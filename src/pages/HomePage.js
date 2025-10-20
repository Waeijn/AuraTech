// Sprint 1: Member 2
// Task: Implement a minimal HomePage with hero and featured section placeholders.
// This file must render without external data dependencies.

import "../styles/home.css";

export default function HomePage() {
  return (
    <section className="home-page">
      {/* Hero Placeholder */}
      <div className="hero">
        <h1>AuraTech — Gaming Gear</h1>
        <p>Dark theme. RGB accents. Browse featured gaming hardware.</p>
      </div>

      {/* Featured Products Placeholder */}
      <section className="featured">
        <h2>Featured Products</h2>
        <p>Member 3 will populate real components in Sprint 2.</p>
      </section>
    </section>
  );
}
