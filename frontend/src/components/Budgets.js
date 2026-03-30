import React, { useState } from 'react';
import './DashboardDark.css';

// Sample initial data
const initialWeeklyBudgets = [
  { id: 1, category: 'Entertainment', icon: '🎉', start: '09/29/2025', end: '10/05/2025', spent: 8, budget: 30 }
];
const initialMonthlyBudgets = [
  { id: 2, category: 'Eating out', icon: '🍽️', start: '10/01/2025', end: '10/31/2025', spent: 16, budget: 100 },
  { id: 3, category: 'Fuel', icon: '⛽', start: '10/01/2025', end: '10/31/2025', spent: 0, budget: 120 },
];

// Emoji picker options
const emojiOptions = [
  "🍽️", "📚", "🎉", "🚗", "⛽", "🏠", "💻", "🧾", "🏥", "🛒", "🎈"
];

// Add/Edit Budget Modal with emoji picker
function BudgetForm({ type, onSave, onClose }) {
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState(emojiOptions[0]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [budget, setBudget] = useState('');
  return (
    <div className="budget-modal">
      <h2>Add {type === 'weekly' ? "Weekly" : "Monthly"} Budget</h2>
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <div className="emoji-picker-row">
        {emojiOptions.map(e => (
          <button
            key={e}
            className={e === icon ? 'emoji-picked' : ''}
            style={{
              fontSize: '24px',
              margin: '4px',
              border: e === icon ? '2px solid #44e089' : '1px solid #3b3b63',
              background: 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setIcon(e)}
          >
            {e}
          </button>
        ))}
      </div>
      <input placeholder="Start Date (MM/DD/YYYY)" value={start} onChange={e => setStart(e.target.value)} />
      <input placeholder="End Date (MM/DD/YYYY)" value={end} onChange={e => setEnd(e.target.value)} />
      <input type="number" placeholder="Budget Amount" value={budget} onChange={e => setBudget(e.target.value)} />
      <div className="modal-btn-row">
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => {
          if (!category || !icon || !start || !end || !budget) return;
          onSave({ category, icon, start, end, spent: 0, budget: Number(budget) });
        }}>Save</button>
      </div>
    </div>
  );
}

function BudgetTypeModal({ onType }) {
  return (
    <div className="budget-modal">
      <h3>Add Budget</h3>
      <button className="modal-btn" onClick={() => onType('monthly')}>📅 Monthly Budget</button>
      <button className="modal-btn" onClick={() => onType('weekly')}>📆 Weekly Budget</button>
    </div>
  );
}

const BudgetGroup = ({ title, budgets, onEdit, onDelete }) => (
  <div className="budget-group-card">
    <div className="budget-group-title">{title}</div>
    {budgets.map(({ id, category, icon, start, end, spent, budget }) => {
      const percent = budget ? Math.round((spent / budget) * 100) : 0;
      const residual = budget - spent;
      return (
        <div className="budget-block" key={id}>
          <div className="budget-block-left">
            <div className="budget-category-title">{category}</div>
            <div className="budget-block-meta">
              <span className="budget-block-icon">{icon}</span>
              <span className="budget-block-date">{start}</span>
            </div>
            <div className="budget-block-bar-row">
              <div className="budget-block-bar">
                <div className="budget-block-bar-progress" style={{ width: `${percent}%` }}></div>
              </div>
              <span className="budget-block-bar-label">{percent}%</span>
              <span className="budget-block-date">{end}</span>
            </div>
            <div className="budget-block-minor-row">
              <span>₹{spent.toLocaleString()}</span>
              <span>₹{budget.toLocaleString()}</span>
            </div>
            <div className="budget-block-residual">Residual amount: ₹{residual.toLocaleString()}</div>
          </div>
          <div className="budget-block-actions">
            <button className="budget-block-btn" title="Edit" onClick={() => onEdit(id)}>&#9998;</button>
            <button className="budget-block-btn" title="Delete" onClick={() => onDelete(id)}>&#128465;</button>
          </div>
        </div>
      );
    })}
    <div className="budget-group-summary">
      {budgets.length > 1 && (
        <span>
          {budgets.reduce((a, b) => a + b.spent, 0).toLocaleString()}
          {' / '}
          {budgets.reduce((a, b) => a + b.budget, 0).toLocaleString()}
        </span>
      )}
    </div>
  </div>
);

export default function Budgets() {
  const [weeklyBudgets, setWeeklyBudgets] = useState(initialWeeklyBudgets);
  const [monthlyBudgets, setMonthlyBudgets] = useState(initialMonthlyBudgets);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetType, setBudgetType] = useState('');
  const [editBudgetId, setEditBudgetId] = useState(null);

  function handleSave(budget) {
    budget.id = Date.now();
    if (budgetType === 'weekly') setWeeklyBudgets(list => [...list, budget]);
    else setMonthlyBudgets(list => [...list, budget]);
    setShowBudgetModal(false);
    setShowTypeModal(false);
  }
  function handleEdit(id, type) {
    setEditBudgetId(id);
    setBudgetType(type);
    setShowBudgetModal(true);
  }
  function handleDelete(id, type) {
    if (type === 'weekly') setWeeklyBudgets(list => list.filter(b => b.id !== id));
    else setMonthlyBudgets(list => list.filter(b => b.id !== id));
  }

  return (
    <main className="main-content budget-page">
      <BudgetGroup title="WEEKLY BUDGETS"
        budgets={weeklyBudgets}
        onEdit={id => handleEdit(id, 'weekly')}
        onDelete={id => handleDelete(id, 'weekly')}
      />
      <BudgetGroup title="MONTHLY BUDGETS"
        budgets={monthlyBudgets}
        onEdit={id => handleEdit(id, 'monthly')}
        onDelete={id => handleDelete(id, 'monthly')}
      />
      <button className="budget-fab" onClick={() => setShowTypeModal(true)}>+</button>
      {showTypeModal && (
        <BudgetTypeModal onType={type => { setBudgetType(type); setShowBudgetModal(true); setShowTypeModal(false); }} />
      )}
      {showBudgetModal && (
        <BudgetForm
          type={budgetType}
          onSave={handleSave}
          onClose={() => { setShowBudgetModal(false); setShowTypeModal(false); }}
        />
      )}
    </main>
  );
}
