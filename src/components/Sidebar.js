import React from "react";
import { FileText, TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      {/* TOP SECTION */}
      <div className="sidebar-top">
        <div className="sidebar-title">Dashboard</div>

        <div className="sidebar-links">
          <button
            className={`sidebar-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FileText size={18} /> Overview
          </button>

          <button
            className={`sidebar-link ${activeTab === "expense" ? "active" : ""}`}
            onClick={() => setActiveTab("expense")}
          >
            <TrendingDown size={18} /> Expense
          </button>

          <button
            className={`sidebar-link ${activeTab === "income" ? "active" : ""}`}
            onClick={() => setActiveTab("income")}
          >
            <TrendingUp size={18} /> Income
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="sidebar-divider"></div>

      {/* BOTTOM SECTION */}
      <div className="sidebar-bottom">
        <button className="budget-logo" onClick={() => alert("Budget clicked!")}>
          <PieChart size={22} /> Budget
        </button>
      </div>
    </aside>
  );
}
