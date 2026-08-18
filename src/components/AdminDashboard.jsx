import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminDashboard = () => {
  const { portfolioData, updateProfile, saveProject, deleteProject } = usePortfolio();

  const [status, setStatus] = useState(portfolioData.hero.status);
  const [bio, setBio] = useState(portfolioData.about.bio);
  const [skills, setSkills] = useState(portfolioData.about.skills);

  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', exe: '', img: '', desc: '', details: '', github: ''
  });

  useEffect(() => {
    setStatus(portfolioData.hero.status);
    setBio(portfolioData.about.bio);
    setSkills(portfolioData.about.skills);
  }, [portfolioData]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(status, bio, skills);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    saveProject({
      ...projectForm,
      id: editingId ? Number(editingId) : undefined
    });
    resetProjectForm();
  };

  const startEditProject = (p) => {
    setEditingId(p.id);
    setProjectForm({
      title: p.title,
      exe: p.exe,
      img: p.img,
      desc: p.desc,
      details: p.details,
      github: p.github
    });
  };

  const resetProjectForm = () => {
    setEditingId(null);
    setProjectForm({ title: '', exe: '', img: '', desc: '', details: '', github: '' });
  };

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Sets base64 image data URL so it displays immediately anywhere
      setProjectForm((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

  return (
    <div>
      <div className="about-card" style={{ marginBottom: '40px' }}>
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-title">edit_profile_data.json</span>
        </div>
        <form onSubmit={handleProfileSubmit} className="form-body">
          <div className="form-group">
            <label htmlFor="statusInput">&gt; HERO STATUS BADGE:</label>
            <input
              type="text"
              id="statusInput"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bioInput">&gt; ABOUT ME PARAGRAPH:</label>
            <textarea
              id="bioInput"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="skillsInput">&gt; SKILLS (Comma Separated):</label>
            <input
              type="text"
              id="skillsInput"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            &gt; SAVE PROFILE DATA
          </button>
        </form>
      </div>

      <div className="about-card">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="terminal-title">manage_projects.db</span>
        </div>
        <div className="form-body">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>
            &gt; {editingId ? 'Edit Project Entry' : 'Add New Project'}
          </h3>

          <form onSubmit={handleProjectSubmit}>
            <div className="form-group">
              <label htmlFor="projTitle">&gt; TITLE:</label>
              <input
                type="text"
                id="projTitle"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="projExe">&gt; EXECUTABLE/FILE NAME (e.g., calc_app.exe):</label>
              <input
                type="text"
                id="projExe"
                value={projectForm.exe}
                onChange={(e) => setProjectForm({ ...projectForm, exe: e.target.value })}
                required
              />
            </div>
           <div className="form-group">
              <label htmlFor="projImg">&gt; IMAGE (URL / PATH / UPLOAD):</label>
               <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <input
                  type="text"
                  id="projImg"
                  placeholder="e.g. /calc.png or https://images.unsplash.com/..."
                  value={projectForm.img}
                  onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                  required
                  />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                 style={{ fontSize: '0.85rem' }}
                />
               </div>
            </div>
            <div className="form-group">
              <label htmlFor="projDesc">&gt; SHORT DESCRIPTION:</label>
              <textarea
                id="projDesc"
                rows="2"
                value={projectForm.desc}
                onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="projDetails">&gt; MODAL DETAILED DESCRIPTION:</label>
              <textarea
                id="projDetails"
                rows="3"
                value={projectForm.details}
                onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="projGithub">&gt; GITHUB REPOSITORY URL:</label>
              <input
                type="url"
                id="projGithub"
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn">
                &gt; {editingId ? 'UPDATE PROJECT' : 'ADD PROJECT'}
              </button>
              {editingId && (
                <button type="button" onClick={resetProjectForm} className="btn btn-outline">
                  CANCEL
                </button>
              )}
            </div>
          </form>

          <hr style={{ borderColor: 'var(--border-color)', margin: '30px 0' }} />

          <h3 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>&gt; Existing Projects</h3>
          <div className="admin-projects-list">
            {portfolioData.projects.map((p) => (
              <div key={p.id} className="admin-project-item">
                <div>
                  <strong style={{ color: 'var(--accent-color)' }}>{p.title}</strong>
                  <small style={{ color: 'var(--text-dim)', display: 'block' }}>{p.exe}</small>
                </div>
                <div className="admin-actions">
                  <button className="btn-sm" onClick={() => startEditProject(p)}>
                    Edit
                  </button>
                  <button
                    className="btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project entry?')) {
                        deleteProject(p.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};