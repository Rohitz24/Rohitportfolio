import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = usePortfolio();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="contact-form">
      <div className="terminal-header">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="terminal-title">auth_gatekeeper.sh</span>
      </div>
      <form onSubmit={handleFormSubmit} className="form-body">
        <div className="form-group">
          <label htmlFor="username">&gt; USERNAME:</label>
          <input
            type="text"
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">&gt; PASSWORD:</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          &gt; AUTHENTICATE
        </button>
      </form>
    </div>
  );
};