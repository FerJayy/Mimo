import React, { useState } from "react";
import "../styles.css";
import Expense from "../components/Expense";
import Sidebar from "../components/Sidebar";
import Income from "../components/Income";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Header */}
          <header className="dashboard-header">
            <h2>Dashboard</h2>
            <div className="user-circle">👤</div>
          </header>

          {/* Top Tab Switcher */}
          <div className="tab-switcher">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={activeTab === "expense" ? "active" : ""}
              onClick={() => setActiveTab("expense")}
            >
              Expense
            </button>
            <button
              className={activeTab === "income" ? "active" : ""}
              onClick={() => setActiveTab("income")}
            >
              Income
            </button>
          </div>

          {/* ===== OVERVIEW SECTION ===== */}
          {activeTab === "overview" && (
            <div className="overview-section">
              {/* Summary Cards */}
              <div className="summary-row">
                <div className="summary-card income">
                  <h4>Income</h4>
                  <p>Rp10.000.000</p>
                </div>
                <div className="summary-card expense">
                  <h4>Expense</h4>
                  <p>-Rp8.500.000</p>
                </div>
                <div className="summary-card saved">
                  <h4>Saved</h4>
                  <p>Rp1.500.000</p>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="chart-grid">
                <div className="chart-box large">Expense Breakdown</div>
                <div className="chart-box small">Calendar</div>
                <div className="chart-box large">Income Sources</div>
                <div className="chart-box small">Recent Transactions</div>
                <div className="chart-box full">Monthly Overview</div>
              </div>
            </div>
          )}

          {/* ===== EXPENSE SECTION ===== */}
          {activeTab === "expense" && (
            <div className="expense-section">
              <Expense />
            </div>
          )}

          {/* ===== INCOME SECTION (for later) ===== */}
          {activeTab === "income" && (
            <div className="income-section">
              <Income />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
