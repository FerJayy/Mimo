import React, { useState } from "react";
import "../styles.css";
import DashboardLogo from "../assets/DashboardLogo.png";
import BudgetLogo from "../assets/BudgetLogo.png";

export default function Sidebar({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(true); // Dashboard open by default

  // Determine if Dashboard should appear active (includes its sub-tabs)
  const isDashboardActive =
    activeTab === "dashboard" ||
    activeTab === "overview" ||
    activeTab === "expense" ||
    activeTab === "income";

  const handleDashboardClick = () => {
    // Always open Dashboard menu
    setOpenMenu(true);
    // Navigate to overview
    setActiveTab("overview");
  };

  const handleBudgetClick = () => {
    // Close dashboard menu when switching to budget
    setOpenMenu(false);
    // Set budget active
    setActiveTab("budget");
  };

  return (
    <aside className="sidebar">
      {/* DASHBOARD SECTION */}
      <div className="sidebar-group">
        <button
          className={`sidebar-toggle ${
            isDashboardActive ? "active" : ""
          } sidebar-logo main-logo`}
          onClick={handleDashboardClick}
        >
          <img src={DashboardLogo} alt="Dashboard Logo" /> 
          <span className={`arrow ${openMenu ? "open" : ""}`}>▾</span>
        </button>

        <div className={`sidebar-links ${openMenu ? "open" : ""}`}>
          <button
            className={`sidebar-link ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <i>📋</i> Overview
          </button>
          <button
            className={`sidebar-link ${
              activeTab === "expense" ? "active" : ""
            }`}
            onClick={() => setActiveTab("expense")}
          >
            <i>💸</i> Expense
          </button>
          <button
            className={`sidebar-link ${
              activeTab === "income" ? "active" : ""
            }`}
            onClick={() => setActiveTab("income")}
          >
            <i>💰</i> Income
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="sidebar-divider"></div>

      {/* BUDGET SECTION */}
      <div
        className={`budget-logo ${
          activeTab === "budget" ? "active" : ""
        }`}
        onClick={handleBudgetClick}
      >
        <img src={BudgetLogo} alt="Budget Logo" />
      </div>
    </aside>
  );
}
