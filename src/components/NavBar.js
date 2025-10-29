import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useState, useEffect } from "react";

export default function NavBar() {
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

  return (
    <header className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        {/* --- Left: Logo --- */}
        <div className="logo">
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Mimo Logo"
              className={`logo-img ${isClicked ? "clicked" : ""}`}
            />
          </Link>
        </div>

        {/* --- Middle: Desktop Navigation --- */}
        <nav className="navlinks desktop-only">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#plans">Plans</a>
        </nav>

        {/* --- Right: Desktop Buttons --- */}
        <div className="nav-actions desktop-only">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/signup" className="btn">Get Started</Link>
        </div>

        {/* --- Hamburger (mobile) --- */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      <nav className={`mobile-menu ${open ? "show" : ""}`}>
        <a href="#features" onClick={() => setOpen(false)}>Features</a>
        <a href="#how" onClick={() => setOpen(false)}>How It Works</a>
        <a href="#plans" onClick={() => setOpen(false)}>Plans</a>
        <Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>Login</Link>
        <Link to="/signup" className="btn" onClick={() => setOpen(false)}>Get Started</Link>
      </nav>
    </header>
  );
}
