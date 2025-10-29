import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import logo from "../assets/Logo.png";
import character from "../assets/character1.png"
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password)
      return setError("Please fill in all fields.");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
    }
  }

  return (
    <div className="signup-page"> {/* reuse the same CSS structure */}
      {/* LEFT SIDE */}
      <div className="signup-left">
        <Link to="/" className="signup-logo">
          <img src={logo} alt="Mimo Logo" />
        </Link>
        <div className="signup-text" style={{ paddingBottom: "140px" }}>
          <h1>
            Good to see you again! <br />
            Let’s <span className="accent">build progress</span> together.
          </h1>
          <img src={character} alt="Mimo Character" className="signup-illustration" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="signup-form-container">
          <h2>Log In</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            {error && <div className="error">{error}</div>}

            <button className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" onClick={handleGoogleSignIn}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              </button>
              <button type="button">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
              </button>
            </div>

            <p className="login-link">
              Not a member? <Link to="/signup">Register Now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}