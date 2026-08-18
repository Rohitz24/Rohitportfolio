import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectModal } from './ProjectModal';

// Clean SVG placeholder to prevent any broken image flickering
const DEFAULT_FALLBACK_IMG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23111827'/%3E%3Cstop offset='100%25' stop-color='%231f2937'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' fill='%2300ff88' font-family='monospace' font-size='16' font-weight='bold' text-anchor='middle' dy='.3em'%3E%26gt%3B %20PROJECT_PREVIEW%3C/text%3E%3C/svg%3E";

export const Projects = () => {
  const { portfolioData } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === activeFilter);

  // Helper to ensure correct path format for local and web images
  const formatImgSrc = (src) => {
    if (!src) return DEFAULT_FALLBACK_IMG;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
      return src;
    }
    return src.startsWith('/') ? src : `/${src}`;
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// SELECTED WORKS</p>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="project-filters">
          {['All', 'Frontend', 'Fullstack'].map((category) => (
            <button
              key={category}
              className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <div key={p.id} className="glass-card project-card">
              <div className="terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-filename">{p.exe || 'app.sh'}</span>
              </div>
              <div className="project-cover">
                <img
                  src={formatImgSrc(p.img)}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevents recursive looping
                    e.currentTarget.src = DEFAULT_FALLBACK_IMG;
                  }}
                />
              </div>
              <div className="project-details">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-footer">
                  <button className="btn-pill" onClick={() => setSelectedProject(p)}>
                    Details
                  </button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pill btn-primary"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};