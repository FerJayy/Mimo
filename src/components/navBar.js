import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleLogoClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); 
  };

  return (
    <header className="nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to ="/">
          <img src={logo} 
          alt="Mimo Logo" 
           className={`logo-img ${isClicked ? "clicked" : ""}`}
          />
          </Link>
        </div>

        {/* Hamburger button (for mobile view) */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation Links */}
        <nav className={`navlinks ${open ? "show" : ""}`}>
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#how" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#plans" onClick={() => setOpen(false)}>Plans</a>
          <Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/signup" className="btn" onClick={() => setOpen(false)}>Get Started</Link>
        </nav>
      </div>
    </header>
  );
}
