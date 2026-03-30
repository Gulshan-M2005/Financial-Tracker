import React, { useState } from 'react';
import './DashboardDark.css';

const initialBills = [
  { id: 1, name: 'Electricity', amount: 1800, dueDate: '2025-09-30' },
  { id: 2, name: 'Water', amount: 500, dueDate: '2025-10-05' },
  { id: 3, name: 'Internet', amount: 1200, dueDate: '2025-10-10' },
  { id: 4, name: 'Rent', amount: 12000, dueDate: '2025-10-01' },
];

function buildCalendar(year, month, bills) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  const cellBills = {};

  for (const bill of bills) {
    const d = new Date(bill.dueDate);
    if (d.getMonth() === month && d.getFullYear() === year) {
      cellBills[d.getDate()] = bill;
    }
  }

  let startDay = first.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1; // Monday start
  const totalDays = last.getDate();

  let week = [];
  for (let i = 1 - startDay; i <= totalDays; i++) {
    week.push(i > 0 && i <= totalDays ? i : null);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length) days.push(week);

  return { days, cellBills };
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const BillReminders = () => {
  const today = new Date();
  const [bills, setBills] = useState(initialBills);
  const [currMonth, setCurrMonth] = useState(today.getMonth());
  const [currYear, setCurrYear] = useState(today.getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', amount: '', dueDate: '' });

  const calendar = buildCalendar(currYear, currMonth, bills);

  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrYear(currYear + 1);
      setCurrMonth(0);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currMonth === 0) {
      setCurrYear(currYear - 1);
      setCurrMonth(11);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  return (
    <main className="main-content bill-fit-page">
      <div className="bill-center-wrap">
        <div className="bill-calendar-modern">
          <div className="bill-cal-header">
            <button onClick={prevMonth} className="bill-cal-nav">&lt;</button>
            <span className="bill-cal-title">{monthNames[currMonth]} {currYear}</span>
            <button onClick={nextMonth} className="bill-cal-nav">&gt;</button>
          </div>
          <div className="bill-calendar-header">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="bill-calendar-cell header">{day}</div>
            ))}
          </div>
          <div className="bill-calendar-body">
            {calendar.days.map((week, idx) => (
              <div key={idx} className="bill-calendar-row">
                {week.map((date, i) => {
                  const bill = calendar.cellBills[date];
                  return (
                    <div key={i} className={`bill-calendar-cell${bill ? " due-modern" : ""}`}>
                      {bill ? (
                        <div className="bill-date-card">
                          <div className="bill-dot-modern"></div>
                          <div className="bill-card-date">{date}</div>
                          <div className="bill-amount-modern">₹{bill.amount}</div>
                        </div>
                      ) : (
                        <span>{date || ""}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="bill-list-card-modern">
          <table className="bills-table-modern">
            <thead>
              <tr>
                <th>Bill Name</th>
                <th>Amount (₹)</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(({ id, name, amount, dueDate }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>₹{amount.toLocaleString()}</td>
                  <td>{new Date(dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Bill Modal */}
        {showModal && (
          <div className="bill-modal-overlay">
            <div className="bill-modal">
              <h3>Add Bill Reminder</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!form.name || !form.amount || !form.dueDate) return;
                  setBills([
                    ...bills,
                    {
                      id: Date.now(),
                      name: form.name,
                      amount: parseInt(form.amount, 10),
                      dueDate: form.dueDate
                    }
                  ]);
                  setForm({ name: '', amount: '', dueDate: '' });
                  setShowModal(false);
                }}
              >
                <input
                  placeholder="Bill Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  placeholder="Amount"
                  type="number"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  required
                />
                <input
                  placeholder="Due Date"
                  type="date"
                  value={form.dueDate}
                  onChange={e => setForm({ ...form, dueDate: e.target.value })}
                  required
                />
                <div className="modal-btn-row">
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Floating Add Button */}
        <button className="add-reminder-fab" onClick={() => setShowModal(true)}>+</button>
      </div>
    </main>
  );
};

export default BillReminders;
