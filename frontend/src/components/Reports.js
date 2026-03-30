import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './DashboardDark.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const months = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
];

// --- MANUAL SAMPLE DATA ---
const monthlyIncome = [1200, 1350, 1400, 1100, 1420, 1500, 1300, 1550, 1450, 1600, 1580, 1700];
const monthlyExpense = [800, 900, 1000, 950, 1200, 1180, 1100, 1250, 1200, 1350, 1400, 1380];
const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Others'];
const categoryExpense = [3500, 1800, 2200, 900, 1100, 600];
// --- END MANUAL DATA ---

const barData = {
  labels: months,
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#44e089',
      data: monthlyIncome,
    },
    {
      label: 'Expense',
      backgroundColor: '#f35c75',
      data: monthlyExpense,
    },
  ],
};

const donutData = {
  labels: categories,
  datasets: [
    {
      data: categoryExpense,
      backgroundColor: [
        '#4cb8c4','#3cd3ad','#ffa657','#f35c75','#8e54e9','#3b79ef'
      ],
      borderWidth: 3,
    },
  ],
};

const Reports = () => (
  <main className="main-content reports-page">
    <h1>Reports</h1>
    <div className="reports-row">
      <div className="report-card">
        <div className="report-card-title">Monthly Income vs Expense</div>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, labels: { color: '#f5f7fa', font: { size: 13 } } },
            },
            scales: {
              x: { ticks: { color: "#adbdfa" }, grid: { color: "#1e2132" } },
              y: { ticks: { color: "#adbdfa" }, grid: { color: "#1e2132" } },
            },
          }}
          height={220}
        />
      </div>
      <div className="report-card">
        <div className="report-card-title">Expense Category Breakdown</div>
        <Doughnut
          data={donutData}
          options={{
            plugins: {
              legend: { display: false },
            },
            cutout: 65,
          }}
        />
        <div className="donut-legend">
          <ul>
            {categories.map((label, idx) => (
              <li key={label}>
                <span style={{
                  background: donutData.datasets[0].backgroundColor[idx % donutData.datasets[0].backgroundColor.length],
                }}></span>
                {label}: ₹{categoryExpense[idx].toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </main>
);

export default Reports;
