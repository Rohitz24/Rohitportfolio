import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const roles = [
  "Frontend Developer",
  "React Specialist",
  "Fullstack Engineer",
  "UI/UX Enthusiast"
];

export const Hero = () => {
  const { portfolioData } = usePortfolio();
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = isDeleting ? 35 : charIdx === current.length ? 1500 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIdx < current.length) {
        setCharIdx((prev) => prev + 1);
      } else if (!isDeleting && charIdx === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx > 0) {
        setCharIdx((prev) => prev - 1);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, roleIdx]);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-layout">
        <div className="hero-content">
          <div className="badge-pulse">
            <span className="pulse-circle"></span>
            {portfolioData.hero.status}
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-accent">Rohit Zade</span>
          </h1>
          <div className="typewriter-line">
            &gt; <span>{roles[roleIdx].substring(0, charIdx)}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-desc">{portfolioData.hero.bioText}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn-pill btn-primary">
              Explore Work
            </a>
            <a href="Rohit_zade_cv.pdf" target="_blank" rel="noreferrer" className="btn-pill">
              View Resume
            </a>
          </div>

          <div className="metrics-strip">
            <div className="metric-item">
              <h4>100%</h4>
              <p>Clean Code</p>
            </div>
            <div className="metric-item">
              <h4>MCA</h4>
              <p>Computer Apps</p>
            </div>
            <div className="metric-item">
              <h4>Modern</h4>
              <p>React & Web APIs</p>
            </div>
          </div>
        </div>

        <div className="hero-avatar-frame">
          <div className="avatar-wrapper glass-card">
            <img src="pic.jpg" alt="Rohit Zade" className="hero-img" />
          </div>
        </div>
      </div>
    </section>
  );
};