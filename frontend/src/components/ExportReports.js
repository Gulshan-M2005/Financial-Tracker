import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './DashboardDark.css';

const ExportReports = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await API.get('/expenses');
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Finance Transactions Report', 14, 22);
    const columns = ['Date', 'Description', 'Amount (₹)', 'Category'];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.amount.toFixed(2),
      t.category,
    ]);

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [118, 102, 255] },
    });

    doc.save('Finance_Report.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      transactions.map(t => ({
        Date: new Date(t.date).toLocaleDateString(),
        Description: t.description,
        Amount: t.amount.toFixed(2),
        Category: t.category,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

    XLSX.writeFile(wb, 'Finance_Report.xlsx');
  };

  return (
    <main className="main-content">
      <h1>Export Reports</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="export-buttons">
        <button onClick={exportPDF}>Export as PDF</button>
        <button onClick={exportExcel}>Export as Excel</button>
      </div>
    </main>
  ); 
};

export default ExportReports;
