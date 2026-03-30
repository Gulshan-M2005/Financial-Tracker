import React, { useState } from 'react';
import './DashboardDark.css';

const expenseEmojis = [
  "🛒", "🍔", "🚕", "🌏", "🏠", "📱", "💡", "🎬", "🩺"
];

export default function ExpenseForm({ close, refresh }) {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [icon, setIcon] = useState(expenseEmojis[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!category || !value || !date || !icon) return;
    fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, value, date, icon }),
    }).then(() => {
      close();
      if (refresh) refresh();
    });
  }

  return (
    <div className="form-modal">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category (e.g., Food)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <div className="emoji-picker-row">
          {expenseEmojis.map(e => (
            <button
              key={e}
              type="button"
              className={e === icon ? 'emoji-picked' : ''}
              style={{
                fontSize: '25px',
                margin: '4px',
                border: e === icon ? '2px solid #f35c75' : '1px solid #3b3b63',
                background: 'transparent',
              }}
              onClick={() => setIcon(e)}
            >
              {e}
            </button>
          ))}
        </div>
        <input
          placeholder="Amount"
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <div className="modal-btn-row">
          <button type="button" onClick={close}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
