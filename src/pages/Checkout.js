// Sprint 4: Member 4
// Task: Minimal Checkout form layout. Must be non-breaking and testable.
// Member 4 will wire up form submission in Sprint 4.

import "../styles/checkout.css";

export default function Checkout() {
  return (
    <section className="checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          Full Name
          <input name="fullname" placeholder="John Doe" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" />
        </label>
        <label>
          Address
          <input name="address" placeholder="Shipping address" />
        </label>
        <button type="submit">Place Order (disabled in placeholder)</button>
        <p>Note: Submission will be implemented in Sprint 4.</p>
      </form>
    </section>
  );
}
