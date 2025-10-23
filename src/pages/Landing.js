import { Link } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/Footer";
import heroImage from "../assets/Mimo wallet.png";
export default function Landing() {
  const features = [
    { title: "Expense Tracking", desc: "Record daily expenses, categorize, and add notes." },
    { title: "Budget Planner", desc: "Set monthly limits and monitor progress." },
    { title: "Income Management", desc: "Track multiple income sources." },
    { title: "Saving Goals", desc: "Create goals and visualize progress." },
    { title: "Reports & Analytics", desc: "Charts and insights by category." },
    { title: "Reminders & Alerts", desc: "Bill due dates and overspending warnings." }
  ];

  const plans = [
    {
      name: "Single Starter Plan",
      price: "Rp30.000/mo",
      features: [
        "Track daily expenses",
        "Categorize spending",
        "Add notes to transactions",
        "Monthly summary report",
        "Connect 2 accounts",
      ],
    },
    {
      name: "Couple Starter Plan",
      price: "Rp50.000/mo",
      badge: "Most Popular",
      features: [
        "Everything in Single",
        "Connect 2 accounts together",
        "Shared budget goals",
        "Multiple income tracking",
        "Export data",
      ],
    },
    {
      name: "Advanced Plan",
      price: "Rp80.000/mo",
      features: [
        "Everything in Couple",
        "Advanced analytics & charts",
        "Bill reminders (auto)",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="page">
      <NavBar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Minimalize your <span className="accent">money</span>
          </h1>
          <p className="lead">
            Turn budgeting into a fun daily habit! With Mimo, you can track, plan, and save while enjoying a friendly, stress-free experience.
          </p>
          <Link to="/signup" className="btn">Get Started</Link>
        </div>
        <div className="hero-right">
          {/* Replace with your exported illustration from Figma */}
          <div className="wallet-illustration" aria-label="Wallet illustration">
          <img src={heroImage} alt="Mimo landing illustration" />
          </div>
        </div>
        <div className="hero-wave" />
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <h2>Product Features</h2>
        <div className="cards-grid">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon">◎</div>
              <h3>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how">
        <h2>
          How <span className="accent">Mimo</span> Works
        </h2>
        <p className="muted">'Add. Save. Track. Repeat'</p>
        <div className="how-steps">
          {["Add your Money", "Set Your Goals", "Track with Ease", "Keep on Track"].map((t, i) => (
            <div className="how-card" key={t}>
              <div className="how-icon">💠</div>
              <div className="how-title">{t}</div>
              {i < 3 && <div className="arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="plans" className="plans">
        <h2>Choose your <span className="accent">Plan</span></h2>
        <div className="plan-grid">
          {plans.map((p) => (
            <div className="plan-card" key={p.name}>
              {p.badge && <div className="badge">{p.badge}</div>}
              <h3>{p.name}</h3>
              <div className="price">{p.price}</div>
              <Link to="/signup" className="btn block">Choose Plan</Link>
              <ul className="plan-list">
                {p.features.map((it) => <li key={it}>✔ {it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
