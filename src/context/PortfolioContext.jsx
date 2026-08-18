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
    if (username === 'admin' && password === 'password123') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      showToast('[AUTH SUCCESSFUL]: Welcome, Admin.');
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

  const updateProfile = (status, bio, skills) => {
    setPortfolioData((prev) => ({
      ...prev,
      hero: { ...prev.hero, status },
      about: { ...prev.about, bio, skills }
    }));
    showToast('[UPDATED]: Profile details saved successfully!');
  };

  const saveProject = (projectPayload) => {
    setPortfolioData((prev) => {
      const existingIndex = prev.projects.findIndex((p) => p.id === projectPayload.id);
      let updatedProjects = [...prev.projects];
      
      if (existingIndex !== -1) {
        updatedProjects[existingIndex] = projectPayload;
        showToast('[PROJECT UPDATED]: Saved changes successfully!');
      } else {
        updatedProjects.push({ ...projectPayload, id: Date.now() });
        showToast('[PROJECT ADDED]: Created new project entry!');
      }
      return { ...prev, projects: updatedProjects };
    });
  };

  const deleteProject = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
    showToast('[DELETED]: Project removed successfully.');
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        portfolioData,
        isAuthenticated,
        view,
        setView,
        login,
        logout,
        updateProfile,
        saveProject,
        deleteProject,
        toastMessage,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);