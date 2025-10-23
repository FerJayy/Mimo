import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="nav">
      <div className="logo">Mimo.</div>
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
