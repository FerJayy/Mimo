import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import logo from "../assets/Logo.png";
import character from "../assets/character.png"
import {useEffect} from "react";


export default function Signup() {
  const [form, setForm] = useState({ first: "", last: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

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
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long.");
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

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
    }
  }

  async function handleFacebookSignIn() {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    navigate("/dashboard");
  } catch (err) {
    console.error("Facebook sign-in failed:", err.message);
    setError("Facebook sign-in failed: " + err.message);
  }
}

  return (
    <div className="signup-page">
      {/* LEFT SIDE */}
      <div className="signup-left">
        <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Mimo Logo"
              className={`logo-img ${isClicked ? "clicked" : ""}`}
            />
          </Link>
        <div className="signup-text">
          <h1>
            Join <span className="accent">Mimo</span> today <br />
            and start building better financial habits.
          </h1>
          <img src={character} alt="Mimo Character" className="signup-illustration" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="signup-right">
        <div className="signup-form-container">
          <h2>Hello! We’re glad to see you.</h2>

          <form onSubmit={handleSubmit} className="signup-form">
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

            <div className="divider">
              <span>or sign up with</span>
            </div>

            <div className="social-login">
              <button type="button" onClick={handleGoogleSignIn}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              </button>
              <button type="button" onClick={handleFacebookSignIn}>
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
              </button>
            </div>
            
            <p className="login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}