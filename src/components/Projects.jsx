import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectModal } from './ProjectModal';

const DEFAULT_FALLBACK_IMG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23111827'/%3E%3Cstop offset='100%25' stop-color='%231f2937'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' fill='%2300ff88' font-family='monospace' font-size='16' font-weight='bold' text-anchor='middle' dy='.3em'%3E%26gt%3B %20PROJECT_PREVIEW%3C/text%3E%3C/svg%3E";

export const Projects = () => {
  const { portfolioData } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = portfolioData.projects || [];

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
        {/* Streamlined Featured Projects Heading */}
        <div className="section-header">
          <p className="section-tag">// SELECTED WORKS</p>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.id} className="glass-card project-card">
              <div className="terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-filename">{p.exe || 'app.sh'}</span>
              </div>

              {/* Clickable Image Directing to Live Demo */}
              <a
                href={p.live || p.github}
                target="_blank"
                rel="noreferrer"
                className="project-cover"
                title={`Open live demo of ${p.title}`}
                style={{ display: 'block', cursor: 'pointer' }}
              >
                <img
                  src={formatImgSrc(p.img)}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_FALLBACK_IMG;
                  }}
                />
              </a>

              <div className="project-details">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-footer" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  <button className="btn-pill" onClick={() => setSelectedProject(p)}>
                    Details
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pill"
                    >
                      GitHub
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-pill btn-primary"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
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