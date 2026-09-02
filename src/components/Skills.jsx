import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills = () => {
  const { portfolioData } = usePortfolio();

  // Fallback categories if not customized in data
  const defaultSkillGroups = [
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
        { name: "Firebase (Auth & Firestore)", level: "84%" },
        { name: "SQL / Relational DBs", level: "78%" },
        { name: "Node.js Basics", level: "70%" }
      ]
    },
    {
      title: "Toolchain & Deployment",
      filename: "devops_config.yaml",
      skills: [
        { name: "Git / GitHub", level: "90%" },
        { name: "Vite & Modern Bundlers", level: "85%" },
        { name: "VS Code & Debuggers", level: "92%" },
        { name: "Netlify / Vercel Deploy", level: "88%" },
        { name: "Postman API Client", level: "85%" }
      ]
    }
  ];

  const skillGroups = portfolioData.skillGroups || defaultSkillGroups;

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">// TECHNICAL ARSENAL</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
        </div>

        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {skillGroups.map((group, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-filename">{group.filename}</span>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {group.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{skill.name}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-color)' }}>{skill.level}</span>
                      </div>
                      <div style={{
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: skill.level,
                          background: 'var(--accent-gradient)',
                          borderRadius: 'var(--radius-full)'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};