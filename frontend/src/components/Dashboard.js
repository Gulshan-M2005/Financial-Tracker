// src/pages/Dashboard.jsx
import React, { useState } from "react";
import TransactionButtons from "../components/TransactionButtons";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// ----- SAMPLE SUMMARY DATA -----
const summary = {
  totalIncome: 52000,
  totalExpense: 44000,
  budgetUsed: 35000,
  savingsGoalProgressPercent: 72,
};

// ----- SAMPLE TRANSACTIONS -----
const transactions = [
  { id: 1, name: "Salary", amount: 35000, type: "income", date: "2025-10-01" },
  { id: 2, name: "Freelancing", amount: 17000, type: "income", date: "2025-10-10" },
  { id: 3, name: "Rent", amount: 14000, type: "expense", date: "2025-10-04" },
  { id: 4, name: "Groceries", amount: 4500, type: "expense", date: "2025-10-08" },
  { id: 5, name: "Electricity Bill", amount: 3000, type: "expense", date: "2025-10-11" },
];

// ----- PIE CHART DATA -----
const pieData = [
  { name: "Income", value: summary.totalIncome },
  { name: "Expenses", value: summary.totalExpense },
];

const pieColors = ["#30c48c", "#ff6b6b"];

const Dashboard = () => {
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  return (
    <div className="dashboard-root">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Clean overview of your finances</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="summary-row">
        <div className="summary-card">
          <span className="summary-label">Total Income</span>
          <span className="summary-value">₹{summary.totalIncome}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value">₹{summary.totalExpense}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Budget Used</span>
          <span className="summary-value">₹{summary.budgetUsed}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Savings Goal</span>
          <span className="summary-value">
            {summary.savingsGoalProgressPercent}%
          </span>
        </div>
      </div>

      {/* Middle row: recent + charts */}
      <div className="middle-row">
        {/* Recent Transactions */}
        <div className="panel recent-panel">
          <div className="panel-header">
            <h2>Recent Transactions</h2>
          </div>
          <ul className="tx-list">
            {transactions.map((tx) => (
              <li key={tx.id} className="tx-item">
                <div className="tx-left">
                  <span className="tx-name">{tx.name}</span>
                  <span className="tx-date">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="tx-right">
                  <span
                    className={
                      tx.type === "income"
                        ? "tx-amount tx-income"
                        : "tx-amount tx-expense"
                    }
                  >
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Charts */}
        <div className="panel charts-panel">
          <div className="chart-block">
            <h2 className="panel-title">Income vs Expenses</h2>
            <PieChart width={240} height={220}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="chart-block">
            <h2 className="panel-title">Savings Goal</h2>
            <div className="progress-bg">
              <div
                className="progress-fill"
                style={{ width: `${summary.savingsGoalProgressPercent}%` }}
              />
            </div>
            <p className="progress-text">
              {summary.savingsGoalProgressPercent}% completed
            </p>
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fab-wrapper">
        <TransactionButtons
          openIncome={() => setShowIncome(true)}
          openExpense={() => setShowExpense(true)}
        />
      </div>

      {/* Dialogs */}
      {showIncome && (
        <IncomeForm close={() => setShowIncome(false)} refresh={() => {}} />
      )}
      {showExpense && (
        <ExpenseForm close={() => setShowExpense(false)} refresh={() => {}} />
      )}
    </div>
  );
};

export default Dashboard;
