import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const About = () => {
  const { portfolioData } = usePortfolio();
  const skillsArray = portfolioData.about.skills.split(',').map((s) => s.trim());
  const timeline = portfolioData.about.timeline || [];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// IDENTITY & EXPERIENCE</p>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Bio & Skills */}
          <div className="glass-card">
            <div className="terminal-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-filename">developer_profile.json</span>
            </div>
            <div className="about-body">
              <h3>Engineer & Problem Solver</h3>
              <p>{portfolioData.about.bio}</p>

              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Core Competencies
              </h4>
              <div className="skill-chips">
                {skillsArray.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Journey Timeline */}
          <div className="glass-card">
            <div className="terminal-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-filename">academic_journey.log</span>
            </div>
            <div className="timeline">
              {timeline.map((item, idx) => (
                <div key={idx} className="timeline-step">
                  <div className="timeline-date">{item.year}</div>
                  <h4>{item.role}</h4>
                  <p style={{ color: 'var(--accent-color)', fontSize: '0.85rem', marginBottom: '4px' }}>
                    {item.institution}
                  </p>
                  <p>{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};