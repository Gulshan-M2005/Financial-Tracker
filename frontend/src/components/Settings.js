import React, { useState, useEffect } from 'react';
import './DashboardDark.css';

const Settings = () => {
  // Example states for user preferences
  const [username, setUsername] = useState('User123');
  const [email, setEmail] = useState('user@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    // Save updated settings - you can extend this to call your backend
    alert('Settings saved!');
  };

  return (
    <main className="main-content">
      <h1>Settings</h1>
      <form onSubmit={handleSave} className="settings-form">
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
        </label>

        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </label>

        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={notificationsEnabled} 
            onChange={e => setNotificationsEnabled(e.target.checked)} 
          />
          Enable Notifications
        </label>

        <button type="submit">Save Settings</button>
      </form>
    </main>
  );
};

export default Settings;
