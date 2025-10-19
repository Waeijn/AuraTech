// Sprint 3: Member 2
// Task: Create a registration page layout for Sprint 3.
// Member 2 will add validation and backend hookup later.

import "../styles/auth.css";

export default function Register() {
  return (
    <section className="auth-page">
      <h1>Register</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Full name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button type="submit">Register</button>
        <p>Member 2: Add registration flow in Sprint 3.</p>
      </form>
    </section>
  );
}
