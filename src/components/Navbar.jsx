import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar = () => {
  const { theme, toggleTheme, view, setView, isAuthenticated, logout } = usePortfolio();
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#home" className="brand-logo">
          <span>&gt;</span> Rohit.dev
        </a>

        {view === 'site' ? (
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            {showAdmin && (
              <li>
                <button className="btn-pill" onClick={() => setView('admin')}>
                  [Admin Portal]
                </button>
              </li>
            )}
          </ul>
        ) : null}

        <div className="nav-actions">
          <button className="btn-pill" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          {view === 'admin' ? (
            <>
              <button className="btn-pill" onClick={() => setView('site')}>
                Exit Admin
              </button>
              {isAuthenticated && (
                <button className="btn-pill" onClick={logout}>
                  Logout
                </button>
              )}
            </>
          ) : (
            <a href="#contact" className="btn-pill btn-primary">
              Get in Touch
            </a>
          )}
        </div>
      </div>
    </header>
  );
};