import React from 'react';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-bar">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-filename">{project.title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              marginLeft: 'auto',
              fontSize: '1.1rem'
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.35rem' }}>{project.title}</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {project.details}
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-pill btn-primary">
              View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};