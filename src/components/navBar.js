import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function NavBar() {
  return (
    <header className="nav">
      <div className="logo">
        <img src={logo} alt="Mimo Logo" />
      </div>
      <nav className="navlinks">
        <a href="#features">Features</a>
        <a href="#how">How It Works</a>
        <a href="#plans">Plans</a>
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/signup" className="btn">Get Started</Link>
      </nav>
    </header>
  );
}
