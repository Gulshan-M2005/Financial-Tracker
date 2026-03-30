// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./DashboardDark.css";

const pages = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard" },
  { id: "transactions", label: "Transactions", path: "/transactions" },
  { id: "reports", label: "Reports", path: "/reports" },
  { id: "budgets", label: "Budgets", path: "/budgets" },
  { id: "savings-goals", label: "Savings Goals", path: "/savings-goals" },
  { id: "investment-tracker", label: "Investment Tracker", path: "/investment-tracker" },
  { id: "bill-reminders", label: "Bill Reminders", path: "/bill-reminders" },
  // removed export-reports and multi-currency-settings
  { id: "settings", label: "Settings", path: "/settings" },
  { id: "help-support", label: "Help & Support", path: "/help-support" },
];

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  return (
    <aside className="sidebar">
      <div className="logo">FinTrack</div>

      <nav>
        {pages.map((page) => (
          <NavLink
            key={page.id}
            to={page.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {page.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          width: "90%",
          alignSelf: "center",
        }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
