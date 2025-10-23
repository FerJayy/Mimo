import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Please fill in all fields.");
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with that email.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="split">
      <div className="left-column">
        <h2>
          Good to see you again! <span className="accent">Let’s build progress</span> together.
        </h2>
      </div>

      <div className="right-column">
        <h3>Log In</h3>
        <form onSubmit={handleSubmit} className="form">
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


           <div style={{ marginTop: "20px" }}>
            <button
            type="button"
            className="btn-outline"
            onClick={async () => {
                const provider = new GoogleAuthProvider();
                try {
                    await signInWithPopup(auth, provider);
                    navigate("/dashboard");
                } catch (err) {
                    setError("Google login failed: " + err.message);
                }
            }}
            >
                Continue with Google
            </button>
        </div>
          



          <p style={{ marginTop: "16px", fontSize: "14px" }}>
            Not a member? <Link to="/signup">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
