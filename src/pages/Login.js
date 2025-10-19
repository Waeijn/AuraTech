// Sprint 3: Member 2
// Task: Create a basic login page layout for Sprint 3.
// Member 2 will add auth logic later; Member 5 will style via auth.css.

import "../styles/auth.css";

export default function Login() {
  return (
    <section className="auth-page">
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button type="submit">Login</button>
        <p>Member 2: Hook this to auth in Sprint 3.</p>
      </form>
    </section>
  );
}
