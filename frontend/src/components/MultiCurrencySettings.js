import React, { useState, useEffect } from 'react';
import './DashboardDark.css';

const currencyOptions = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];

const MultiCurrencySettings = () => {
  const [baseCurrency, setBaseCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const fetchExchangeRates = async () => {
    try {
      // Example API - replace with your favorite exchange rate API
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const data = await response.json();
      setExchangeRates(data.rates);
      setError('');
    } catch (err) {
      setError('Failed to fetch exchange rates');
    }
  };

  return (
    <main className="main-content">
      <h1>Multi-Currency Settings</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="currency-selector">
        <label>
          Base Currency:
          <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            {currencyOptions.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="exchange-rates">
        <h3>Exchange Rates for 1 {baseCurrency}</h3>
        <table>
          <thead>
            <tr><th>Currency</th><th>Rate</th></tr>
          </thead>
          <tbody>
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MultiCurrencySettings;
