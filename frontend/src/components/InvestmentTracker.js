import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';
import './DashboardDark.css';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

const sampleInvestments = [
  { id: 'AAPL', name: 'Apple Inc.', type: 'Stock', amount: 80000, changePercent: 1.3, quantity: 50 },
  { id: 'HDFCBANK', name: 'HDFC Bank', type: 'Stock', amount: 21000, changePercent: -2.0, quantity: 15 },
  { id: 'BTC', name: 'Bitcoin', type: 'Crypto', amount: 50000, changePercent: 3.1, quantity: 0.2 },
  { id: 'ETH', name: 'Ethereum', type: 'Crypto', amount: 45000, changePercent: 1.8, quantity: 1.5 },
];

const sampleHistory = [
  { date: 'May', value: 132000 },
  { date: 'Jun', value: 135000 },
  { date: 'Jul', value: 136500 },
  { date: 'Aug', value: 138000 },
  { date: 'Sep', value: 140500 },
  { date: 'Oct', value: 146000 },
];

const sampleTransactions = [
  { id: 1, date: '2025-10-02', asset: 'HDFCBANK', type: 'Buy', qty: 5, price: 1800, amount: 9000 },
  { id: 2, date: '2025-09-22', asset: 'AAPL', type: 'Dividend', qty: 0, price: 0, amount: 350 },
  { id: 3, date: '2025-09-06', asset: 'BTC', type: 'Buy', qty: 0.05, price: 2400000, amount: 12000 },
];

const performanceData = {
  labels: sampleHistory.map(h => h.date),
  datasets: [
    {
      label: 'Portfolio Value',
      fill: true,
      data: sampleHistory.map(h => h.value),
      borderColor: '#32fedc',
      backgroundColor: 'rgba(50,254,220,0.07)',
      tension: 0.36,
      pointRadius: 5,
      pointBorderColor: '#222',
      pointBackgroundColor: '#32fedc',
    },
  ],
};

const pieData = {
  labels: sampleInvestments.map(inv => inv.name),
  datasets: [
    {
      data: sampleInvestments.map(inv => inv.amount),
      backgroundColor: ['#4cb8c4', '#f35c75', '#ffa657', '#386fff'],
      borderWidth: 3,
    },
  ],
};

const getPortfolioValue = arr => arr.reduce((t, i) => t + i.amount, 0);
const getProfitCount = arr => arr.filter(i => i.changePercent > 0).length;
const getBest = arr => arr.reduce((b, i) => (b == null || i.changePercent > b.changePercent) ? i : b, null);
const getWorst = arr => arr.reduce((w, i) => (w == null || i.changePercent < w.changePercent) ? i : w, null);

const InvestmentTracker = () => {
  const [investments, setInvestments] = useState([]);
  useEffect(() => setInvestments(sampleInvestments), []);

  const portfolioValue = getPortfolioValue(investments);
  const profitCount = getProfitCount(investments);
  const bestAsset = getBest(investments);
  const worstAsset = getWorst(investments);

  const milestone = portfolioValue >= 100000 ? "🎉 Your portfolio just crossed ₹1 Lakh!" : "";
  const profitMsg = profitCount > 0
    ? `You have ${profitCount} asset${profitCount > 1 ? "s" : ""} in profit today! 🎉`
    : "Track your assets for more profit!";
  const hdfcDrop = investments.find(i => i.id === "HDFCBANK" && i.changePercent < 0)
    ? "Alert: HDFC Bank has dropped 2% since yesterday."
    : "";

  return (
    <main className="main-content investment-full-page">
      <div className="inv-header-row">
        <div className="inv-portfolio-pie">
          <Pie
            data={pieData}
            options={{ plugins: { legend: { display: false } }, cutout: 57 }}
            height={185}
          />
          <div className="inv-pie-legend">
            <ul>
              {pieData.labels.map((label, idx) => (
                <li key={label}>
                  <span style={{ background: pieData.datasets[0].backgroundColor[idx % pieData.datasets[0].backgroundColor.length] }}></span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="inv-summary-cards">
          <div className="inv-summary-card">
            <span className="inv-card-label">Portfolio Value</span>
            <span className="inv-card-val">₹{portfolioValue.toLocaleString()}</span>
          </div>
          <div className="inv-summary-card">
            <span className="inv-card-label">Best</span>
            <span className="inv-card-val green">
              {bestAsset ? `${bestAsset.name} (${bestAsset.changePercent}% ↑)` : "-"}
            </span>
          </div>
          <div className="inv-summary-card">
            <span className="inv-card-label">Worst</span>
            <span className="inv-card-val red">
              {worstAsset ? `${worstAsset.name} (${worstAsset.changePercent}% ↓)` : "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="inv-banners">
        <div className="inv-banner profit">{profitMsg}</div>
        {hdfcDrop && <div className="inv-banner alert">{hdfcDrop}</div>}
        {milestone && <div className="inv-banner milestone">{milestone}</div>}
      </div>

      <div className="inv-layout-two">
        <div className="inv-card">
          <div className="inv-card-title">Holdings</div>
          <table className="investments-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Value (₹)</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.name}</td>
                  <td>{inv.type}</td>
                  <td>{inv.quantity}</td>
                  <td>₹{inv.amount.toLocaleString()}</td>
                  <td className={inv.changePercent >= 0 ? "green" : "red"}>
                    {inv.changePercent >= 0
                      ? (<><span className="inv-arrow">▲</span>+{inv.changePercent}%</>)
                      : (<><span className="inv-arrow">▼</span>{inv.changePercent}%</>)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="inv-card">
          <div className="inv-card-title">Portfolio Performance</div>
          <Line
            data={performanceData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: "#adbdfa" }, grid: { color: "#404363" } },
                y: { ticks: { color: "#adbdfa" }, grid: { color: "#404363" } },
              },
            }}
            height={130}
          />
        </div>
      </div>

      <div className="inv-card" style={{ marginTop: 26 }}>
        <div className="inv-card-title">Recent Transactions</div>
        <table className="inv-tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {sampleTransactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.asset}</td>
                <td>{tx.type}</td>
                <td>{tx.qty}</td>
                <td>₹{tx.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="fab inv-fab">+</button>
    </main>
  );
};

export default InvestmentTracker;
