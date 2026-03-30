import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import Budgets from './components/Budgets';
import SavingsGoals from './components/SavingsGoals';
import InvestmentTracker from './components/InvestmentTracker';
import BillReminders from './components/BillReminders';
import ExportReports from './components/ExportReports';
import MultiCurrencySettings from './components/MultiCurrencySettings';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';
import Login from './components/Login';
import Register from './components/Register';
const AppRoutes = () => {
  useEffect(() => {
    localStorage.removeItem('token'); // Always remove token on reload
  }, []);

  const { user} = useContext(AuthContext);
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/investment-tracker" element={<InvestmentTracker />} />
          <Route path="/bill-reminders" element={<BillReminders />} />
          <Route path="/export-reports" element={<ExportReports />} />
          <Route path="/multi-currency-settings" element={<MultiCurrencySettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;
