import React, { useState, useEffect } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import './DashboardDark.css';

// Category to emoji map for fallback icon
const categoryIcons = {
  'food': '🍔',
  'house': '🏠',
  'salary': '💰',
  'store': '🛒',
  'vacation': '🏖️',
  'other': '📦',
  'household': '🏠',
  'default': '💸',
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    Promise.all([
      fetch("http://localhost:5000/api/incomes").then(r => r.json()),
      fetch("http://localhost:5000/api/expenses").then(r => r.json())
    ])
      .then(([incomesData, expensesData]) => {
        const allTx = [
          ...incomesData.map(tx => ({
            ...tx,
            type: 'income',
            icon: tx.icon || categoryIcons[tx.category?.toLowerCase()] || categoryIcons.default,
            checked: true,
            amount: Number(tx.value),
            description: tx.category || 'Income'
          })),
          ...expensesData.map(tx => ({
            ...tx,
            type: 'expense',
            icon: tx.icon || categoryIcons[tx.category?.toLowerCase()] || categoryIcons.default,
            checked: true,
            amount: Number(tx.value),
            description: tx.category || 'Expense'
          }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(allTx);
      })
      .catch(() => setError('Failed to load transactions!'));
  };

  const total = transactions.reduce(
    (sum, t) => sum + (t.type === 'expense' ? -t.amount : t.amount),
    0
  );

  return (
    <main className="main-content transaction-page" style={{ minHeight: '70vh' }}>
      <section className="transactions-content-panel">
        <div className="transactions-header-row">
          <span className="transactions-date-title">Transactions</span>
          <span className="transactions-total">
            Total: <span className={total < 0 ? "tx-neg" : "tx-pos"}>
              {total < 0 ? "-" : "+"}₹{Math.abs(total).toFixed(2)}
            </span>
          </span>
        </div>
        <div className="transactions-list">
          {transactions.map(tx => (
            <div key={tx._id || Math.random()} className="transaction-row">
              <input type="checkbox" checked={tx.checked} readOnly />
              <span className="tx-icon" style={{fontSize: '22px', marginRight: '6px'}}>
                {tx.icon}
              </span>
              <span className="tx-desc">{tx.description}</span>
              <span className="tx-cat">{tx.account || tx.category}</span>
              <span className={`tx-amt ${tx.type === 'expense' ? 'tx-neg' : 'tx-pos'}`}>
                {tx.type === 'expense' ? '-' : '+'}₹{Number(tx.amount).toFixed(2)}
              </span>
              <span className="tx-date">{new Date(tx.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
        {showIncome && <IncomeForm close={() => setShowIncome(false)} refresh={refreshData} />}
        {showExpense && <ExpenseForm close={() => setShowExpense(false)} refresh={refreshData} />}
      </section>
      <div className="fab-fixed-container">
        <button className="fab fab-plus" title="Add Income" onClick={() => setShowIncome(true)}>+</button>
        <button className="fab fab-minus" title="Add Expense" onClick={() => setShowExpense(true)}>-</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
};

export default Transactions;
