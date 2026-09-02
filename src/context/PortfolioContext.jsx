import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData, DATA_VERSION } from '../data/defaultData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  const [portfolioData, setPortfolioData] = useState(() => {
    const savedVersion = localStorage.getItem('portfolioVersion');
    const saved = localStorage.getItem('portfolioData');

    // If the deployed code version is newer, discard local cache and use the new code!
    if (savedVersion !== DATA_VERSION || !saved) {
      localStorage.setItem('portfolioVersion', DATA_VERSION);
      localStorage.setItem('portfolioData', JSON.stringify(initialPortfolioData));
      return initialPortfolioData;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return initialPortfolioData;
    }
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

  const updateEntirePortfolio = (newData) => {
    setPortfolioData(newData);
    showToast('[SAVED LOCALLY]: Saved in current browser session.');
  };

  const resetToCodeDefault = () => {
    localStorage.removeItem('portfolioData');
    localStorage.setItem('portfolioVersion', DATA_VERSION);
    setPortfolioData(initialPortfolioData);
    showToast('[RESET]: Synchronized with deployment code.');
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        portfolioData,
        setPortfolioData,
        updateEntirePortfolio,
        resetToCodeDefault,
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