import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminDashboard = () => {
  const { portfolioData, updateEntirePortfolio, clearAllProjects } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');

  // Hero & Profile State
  const [heroStatus, setHeroStatus] = useState(portfolioData.hero?.status || '');
  const [heroBio, setHeroBio] = useState(portfolioData.hero?.bioText || '');
  const [profileImg, setProfileImg] = useState(portfolioData.hero?.profileImg || '/pic.jpg');
  const [resumeUrl, setResumeUrl] = useState(portfolioData.hero?.resumeUrl || '/Rohit_zade_cv.pdf');

  // Social Links
  const [socials, setSocials] = useState({
    github: portfolioData.socials?.github || '',
    linkedin: portfolioData.socials?.linkedin || '',
    twitter: portfolioData.socials?.twitter || '',
    email: portfolioData.socials?.email || ''
  });

  // Summary & Competencies
  const [aboutBio, setAboutBio] = useState(portfolioData.about?.bio || '');
  const [competencies, setCompetencies] = useState(portfolioData.about?.skills || '');

  // Academic Timeline
  const [timeline, setTimeline] = useState(portfolioData.about?.timeline || []);

  // Technical Skills Groups
  const [skillGroups, setSkillGroups] = useState(portfolioData.skillGroups || [
    {
      title: "Frontend Engineering",
      filename: "frontend_stack.tsx",
      skills: [
        { name: "React.js", level: "90%" },
        { name: "JavaScript (ES6+)", level: "88%" },
        { name: "HTML5 / CSS3", level: "95%" },
        { name: "Tailwind CSS", level: "85%" },
        { name: "Redux Toolkit", level: "80%" }
      ]
    },
    {
      title: "Backend & Systems",
      filename: "backend_services.java",
      skills: [
        { name: "Java", level: "82%" },
        { name: "REST APIs", level: "88%" },
        { name: "Firebase", level: "84%" },
        { name: "SQL / Relational DBs", level: "78%" }
      ]
    },
    {
      title: "Toolchain & Deployment",
      filename: "devops_config.yaml",
      skills: [
        { name: "Git / GitHub", level: "90%" },
        { name: "Vite", level: "85%" },
        { name: "Netlify / Vercel", level: "88%" },
        { name: "Postman", level: "85%" }
      ]
    }
  ]);

  // Projects Registry
  const [projects, setProjects] = useState(portfolioData.projects || []);
  const [editingProjId, setEditingProjId] = useState(null);
  const [projectInput, setProjectInput] = useState({
    title: '', exe: '', img: '', desc: '', details: '', github: '', live: ''
  });

  // Direct Profile Photo File Picker
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Direct PDF Document File Picker
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a valid PDF document.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setResumeUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Direct Project Cover Image File Picker
  const handleProjectImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProjectInput((prev) => ({ ...prev, img: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // Timeline Event Handlers
  const handleTimelineChange = (idx, field, value) => {
    const updated = [...timeline];
    updated[idx][field] = value;
    setTimeline(updated);
  };

  const addTimelineItem = () => {
    setTimeline([
      ...timeline,
      { year: '2026', role: 'Degree / Program', institution: 'University / Institute', details: 'Core focus and engineering specialization' }
    ]);
  };

  const removeTimelineItem = (idx) => {
    setTimeline(timeline.filter((_, i) => i !== idx));
  };

  // Skills Group Handlers
  const handleSkillChange = (gIdx, sIdx, field, val) => {
    const updated = [...skillGroups];
    updated[gIdx].skills[sIdx][field] = val;
    setSkillGroups(updated);
  };

  const addSkillToGroup = (gIdx) => {
    const updated = [...skillGroups];
    updated[gIdx].skills.push({ name: 'New Skill', level: '80%' });
    setSkillGroups(updated);
  };

  const removeSkillFromGroup = (gIdx, sIdx) => {
    const updated = [...skillGroups];
    updated[gIdx].skills.splice(sIdx, 1);
    setSkillGroups(updated);
  };

  // Projects Handlers
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (editingProjId) {
      setProjects(projects.map((p) => p.id === editingProjId ? { ...projectInput, id: editingProjId } : p));
    } else {
      setProjects([...projects, { ...projectInput, id: Date.now() }]);
    }
    setEditingProjId(null);
    setProjectInput({ title: '', exe: '', img: '', desc: '', details: '', github: '', live: '' });
  };

  const startEditProject = (p) => {
    setEditingProjId(p.id);
    setProjectInput({ ...p });
  };

  const removeProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Synchronize Everything with PortfolioContext & LocalStorage
  const handleGlobalSave = () => {
    const payload = {
      ...portfolioData,
      hero: {
        status: heroStatus,
        bioText: heroBio,
        profileImg,
        resumeUrl
      },
      socials,
      about: {
        bio: aboutBio,
        skills: competencies,
        timeline
      },
      skillGroups,
      projects
    };
    updateEntirePortfolio(payload);
  };

  return (
    <div className="admin-wrapper" style={{ width: '100%', maxWidth: '1020px', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Admin Workspace</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure profile media, dynamic skills, and featured work</p>
        </div>
        <button className="btn-pill btn-primary" onClick={handleGlobalSave} style={{ padding: '0.75rem 1.8rem' }}>
          ✓ Save All Changes
        </button>
      </div>

      {/* Segmented Workspace Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        {[
          { id: 'profile', label: '1. Hero, Resume & Socials' },
          { id: 'about', label: '2. Summary & Academic Log' },
          { id: 'skills', label: '3. Technical Skills' },
          { id: 'projects', label: '4. Featured Projects' }
        ].map((tab) => (
          <button
            key={tab.id}
            className="btn-pill"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'var(--accent-color)' : 'var(--surface-color)',
              color: activeTab === tab.id ? '#0b0f17' : 'var(--text-secondary)',
              borderColor: activeTab === tab.id ? 'var(--accent-color)' : 'var(--border-subtle)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HERO, RESUME UPLOAD & SOCIAL LINKS */}
      {activeTab === 'profile' && (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-color)' }}>
            // Hero Status, Media &amp; Social Links
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label>&gt; Availability Status Badge</label>
              <input
                type="text"
                value={heroStatus}
                onChange={(e) => setHeroStatus(e.target.value)}
                placeholder="STATUS: AVAILABLE FOR WORK"
              />
            </div>

            {/* Resume with File Upload + Text URL */}
            <div className="form-group">
              <label>&gt; Resume PDF (Local Path or Direct PDF Upload)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="/Rohit_zade_cv.pdf or https://..."
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    style={{ fontSize: '0.85rem' }}
                  />
                  {resumeUrl.startsWith('data:application/pdf') && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>
                      ✓ PDF Loaded
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>&gt; Hero Headline Tagline</label>
            <textarea
              rows="2"
              value={heroBio}
              onChange={(e) => setHeroBio(e.target.value)}
              placeholder="Software Engineer & Frontend Developer..."
            />
          </div>

          {/* Profile Photo Upload & Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '2rem', alignItems: 'center' }}>
            <img
              src={profileImg}
              alt="Avatar Preview"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                border: '1px solid var(--border-subtle)'
              }}
            />
            <div className="form-group">
              <label>&gt; Profile Photo (Path, URL or Direct Image Upload)</label>
              <input
                type="text"
                value={profileImg}
                onChange={(e) => setProfileImg(e.target.value)}
                placeholder="/pic.jpg"
                style={{ marginBottom: '8px' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Social Profiles Bar */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Social Handles (Shown beneath profile photo)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label>GitHub Profile</label>
                <input
                  type="url"
                  value={socials.github}
                  onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input
                  type="url"
                  value={socials.linkedin}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="form-group">
                <label>X / Twitter</label>
                <input
                  type="url"
                  value={socials.twitter}
                  onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  value={socials.email}
                  onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                  placeholder="mailto:user@mail.com"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUMMARY & ACADEMIC LOG */}
      {activeTab === 'about' && (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-color)' }}>
            // Developer Summary &amp; Academic Log
          </h3>

          <div className="form-group">
            <label>&gt; About Bio Summary</label>
            <textarea
              rows="4"
              value={aboutBio}
              onChange={(e) => setAboutBio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>&gt; Core Competencies Chips (Comma-separated)</label>
            <input
              type="text"
              value={competencies}
              onChange={(e) => setCompetencies(e.target.value)}
              placeholder="React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Java"
            />
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Academic Journey Timeline</h4>
              <button className="btn-pill" onClick={addTimelineItem} style={{ fontSize: '0.75rem' }}>
                + Add Academic Entry
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {timeline.map((item, idx) => (
                <div key={idx} style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.15)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)}
                      placeholder="Year (e.g. 2024 - 2026)"
                    />
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleTimelineChange(idx, 'role', e.target.value)}
                      placeholder="Degree / Program"
                    />
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleTimelineChange(idx, 'institution', e.target.value)}
                      placeholder="Institution / University"
                    />
                    <button
                      className="btn-pill"
                      onClick={() => removeTimelineItem(idx)}
                      style={{ color: '#ff5f56', borderColor: '#ff5f56', padding: '0.4rem 0.8rem' }}
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.details}
                    onChange={(e) => handleTimelineChange(idx, 'details', e.target.value)}
                    placeholder="Specialization & key curriculum details"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICAL SKILLS & METERS */}
      {activeTab === 'skills' && (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-color)' }}>
            // Technical Arsenal Groups &amp; Percentages
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {skillGroups.map((group, gIdx) => (
              <div key={gIdx} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{group.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>{group.filename}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(gIdx, sIdx, 'name', e.target.value)}
                        style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                      />
                      <input
                        type="text"
                        value={skill.level}
                        onChange={(e) => handleSkillChange(gIdx, sIdx, 'level', e.target.value)}
                        style={{ width: '70px', padding: '6px 10px', fontSize: '0.85rem' }}
                      />
                      <button
                        onClick={() => removeSkillFromGroup(gIdx, sIdx)}
                        style={{ background: 'none', border: 'none', color: '#ff5f56', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-pill"
                  onClick={() => addSkillToGroup(gIdx)}
                  style={{ fontSize: '0.75rem', width: '100%' }}
                >
                  + Add Skill to {group.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FEATURED PROJECTS (FULL CRUD + CLEAR ALL) */}
      {activeTab === 'projects' && (
        <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-color)' }}>
              // Featured Projects Registry
            </h3>
            {projects.length > 0 && (
              <button
                className="btn-pill"
                style={{ color: '#ff5f56', borderColor: '#ff5f56' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove ALL project entries?')) {
                    clearAllProjects();
                    setProjects([]);
                  }
                }}
              >
                Remove All Projects
              </button>
            )}
          </div>

          {/* New / Edit Project Form */}
          <form
            onSubmit={handleSaveProject}
            style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem'
            }}
          >
            <h4 style={{ fontWeight: 600 }}>{editingProjId ? 'Edit Project Entry' : 'Add New Project'}</h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={projectInput.title}
                  onChange={(e) => setProjectInput({ ...projectInput, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Executable / File Name</label>
                <input
                  type="text"
                  value={projectInput.exe}
                  onChange={(e) => setProjectInput({ ...projectInput, exe: e.target.value })}
                  placeholder="weather_app.sh"
                  required
                />
              </div>
              <div className="form-group">
                <label>GitHub Repository URL</label>
                <input
                  type="url"
                  value={projectInput.github}
                  onChange={(e) => setProjectInput({ ...projectInput, github: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Live URL (Vercel / Netlify)</label>
                <input
                  type="url"
                  value={projectInput.live}
                  onChange={(e) => setProjectInput({ ...projectInput, live: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Project Cover Image (Path, Link or File Upload)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={projectInput.img}
                  onChange={(e) => setProjectInput({ ...projectInput, img: e.target.value })}
                  placeholder="/calc.jpg"
                  style={{ flexGrow: 1 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImgUpload}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Short Description (Card)</label>
              <textarea
                rows="2"
                value={projectInput.desc}
                onChange={(e) => setProjectInput({ ...projectInput, desc: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Deep-dive Details (Modal)</label>
              <textarea
                rows="3"
                value={projectInput.details}
                onChange={(e) => setProjectInput({ ...projectInput, details: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-pill btn-primary">
                {editingProjId ? 'Update Project' : '+ Add Project'}
              </button>
              {editingProjId && (
                <button
                  type="button"
                  className="btn-pill"
                  onClick={() => {
                    setEditingProjId(null);
                    setProjectInput({ title: '', exe: '', img: '', desc: '', details: '', github: '', live: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Active Projects List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontWeight: 600 }}>Current Projects ({projects.length})</h4>
            {projects.length === 0 && (
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>No projects available. Add one above.</p>
            )}
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <strong>{p.title}</strong>
                  <small style={{ color: 'var(--text-tertiary)', display: 'block' }}>
                    {p.exe} | {p.live || 'No live link'}
                  </small>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn-pill"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                    onClick={() => startEditProject(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-pill"
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', color: '#ff5f56', borderColor: '#ff5f56' }}
                    onClick={() => removeProject(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};