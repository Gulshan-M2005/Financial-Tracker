import React, { useState } from 'react';
import './DashboardDark.css';

const emojiOptions = ['💰', '🏖️', '💻', '🚗', '🏡', '🚲', '🎨', '🛋️', '🛫', '🎉'];

const defaultGoals = [
  { id: 1, name: 'Emergency Fund', target: 10000, saved: 6500, dueDate: '2026-01-01', emoji: '💰' },
  { id: 2, name: 'Vacation', target: 5000, saved: 3200, dueDate: '2025-12-01', emoji: '🏖️' },
  { id: 3, name: 'New Laptop', target: 75000, saved: 15000, dueDate: '2026-06-01', emoji: '💻' },
];

const AddGoalModal = ({ addGoal, close }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [emoji, setEmoji] = useState(emojiOptions[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !target || !dueDate || !emoji) return;
    addGoal({
      id: Date.now(),
      name,
      target: parseInt(target, 10),
      saved: 0,
      dueDate,
      emoji,
    });
    close();
  }
  return (
    <div className="goal-modal">
      <h2>Add Savings Goal</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Goal Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Target Amount" type="number" value={target} onChange={e => setTarget(e.target.value)} required />
        <input placeholder="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        <div className="emoji-picker-row">
          {emojiOptions.map(e => (
            <button
              key={e}
              type="button"
              className={emoji === e ? 'emoji-picked' : ''}
              style={{
                fontSize: '22px',
                margin: '0 4px',
                border: emoji === e ? '2px solid #44e089' : '1px solid #33396d',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setEmoji(e)}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="modal-btn-row">
          <button type="button" onClick={close}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default function SavingsGoals() {
  const [goals, setGoals] = useState(defaultGoals);
  const [showModal, setShowModal] = useState(false);

  function addGoal(goal) {
    setGoals([...goals, goal]);
  }

  function depositMore(goalId) {
    const amt = prompt('How much extra do you want to deposit?');
    if (amt) {
      setGoals(goals =>
        goals.map(g =>
          g.id === goalId ? { ...g, saved: g.saved + parseInt(amt, 10) } : g
        )
      );
    }
  }

  function deleteGoal(goalId) {
    setGoals(goals => goals.filter(g => g.id !== goalId));
  }

  return (
    <main className="main-content">
      <h1>Savings Goals</h1>
      <div className="goals-list">
        {goals.map(goal => {
          const progressPercent = Math.min(100, (goal.saved / goal.target) * 100);
          return (
            <div key={goal.id} className="goal-card">
              <div className="goal-head-row">
                <span className="goal-emoji">{goal.emoji}</span>
                <h2>{goal.name}</h2>
                <button
                  className="goal-delete-btn"
                  title="Delete goal"
                  onClick={() => deleteGoal(goal.id)}
                >🗑️</button>
              </div>
              <span className="goal-date">Due by: {new Date(goal.dueDate).toLocaleDateString()}</span>
              <div className="progress-bar-container">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${progressPercent}%`,
                      transition: "width 0.9s cubic-bezier(0.36,0.57,0.55,1)",
                      background: progressPercent > 85 ? "#44e089" : "#74c7fb"
                    }}
                  ></div>
                </div>
                <div className="goal-progress-txt">{progressPercent.toFixed(0)}%</div>
              </div>
              <p>
                ₹{goal.saved.toLocaleString()} saved out of ₹{goal.target.toLocaleString()}
              </p>
              <button className="goal-deposit-btn" onClick={() => depositMore(goal.id)}>
                Deposit More
              </button>
            </div>
          );
        })}
      </div>
      <button className="goal-fab" onClick={() => setShowModal(true)}>+</button>
      {showModal && <AddGoalModal addGoal={addGoal} close={() => setShowModal(false)} />}
    </main>
  );
}
