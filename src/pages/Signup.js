import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function Signup() {
  const [form, setForm] = useState({ first: "", last: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!form.first || !form.last || !form.email || !form.password) {
      return setError("Please fill in all fields.");
    }
    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      return setError("Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCred.user, { displayName: `${form.first} ${form.last}` });
      console.log("User created:", userCred.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="split">
      <div className="left-column">
        <h2>
          Join <span className="accent">Mimo</span> today
        </h2>
        <p>Start building better financial habits.</p>
      </div>

      <div className="right-column">
        <h3>Hello! We’re glad to see you.</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <input
              type="text"
              name="first"
              placeholder="First Name"
              value={form.first}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last"
              placeholder="Last Name"
              value={form.last}
              onChange={handleChange}
            />
          </div>

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
            {loading ? "Creating account..." : "Sign Up"}
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
                    setError("Google sign-in failed: " + err.message);
                }
            }}
            >
             Continue with Google
            </button>
            </div>

          <p style={{ marginTop: "16px", fontSize: "14px" }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}