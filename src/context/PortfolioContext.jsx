import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/defaultData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : initialPortfolioData;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('adminAuth') === 'true'
  );
  const [view, setView] = useState('site');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const login = (username, password) => {
    if (username.trim() === 'admin' && password.trim() === 'password123') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      showToast('[AUTH SUCCESSFUL]: Welcome, Rohit.');
      return true;
    }
    showToast('[AUTH FAILED]: Invalid Credentials!');
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setView('site');
    showToast('[LOGOUT]: Session terminated.');
  };

  // Full-state updater for comprehensive dashboard control
  const updateEntirePortfolio = (newData) => {
    setPortfolioData(newData);
    showToast('[SAVED]: Portfolio settings synchronized!');
  };

  // Delete all projects action
  const clearAllProjects = () => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: []
    }));
    showToast('[REMOVED]: All project entries cleared.');
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        portfolioData,
        setPortfolioData,
        updateEntirePortfolio,
        clearAllProjects,
        isAuthenticated,
        view,
        setView,
        login,
        logout,
        toastMessage,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);