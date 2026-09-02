import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import './index.css';

const MainContent = () => {
  const { view, isAuthenticated, toastMessage } = usePortfolio();

  return (
    <>
      <div className="ambient-glow glow-top"></div>
      <div className="ambient-glow glow-middle"></div>
      <Navbar />

      {toastMessage && <div className="toast-msg">{toastMessage}</div>}

      {view === 'site' ? (
        <main>
          <Hero />
          <About />
          <Projects />
          {/* Dedicated Skills Section in the middle of Projects and Contact */}
          <Skills />
          <Contact />
          <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '2.5rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              &copy; {new Date().getFullYear()} Rohit Zade. All rights reserved. | Apple Minimal &amp; Retro Aesthetics.
            </p>
          </footer>
        </main>
      ) : (
        <div className="container section" style={{ paddingTop: '100px' }}>
          {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}