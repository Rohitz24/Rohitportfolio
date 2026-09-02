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

  const socials = portfolioData.socials || {
    github: "https://github.com/Rohitz24",
    linkedin: "https://linkedin.com/in/rohit-zade",
    twitter: "https://twitter.com",
    email: "mailto:your-email@example.com"
  };

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

  // Robust handler to open both base64 uploaded PDFs and static/hosted paths
  const handleOpenResume = (e) => {
    e.preventDefault();
    const resumeUrl = portfolioData.hero?.resumeUrl || "/Rohit_zade_cv.pdf";

    // If it's an uploaded base64 data URI, convert to Blob URL so browsers don't block it
    if (resumeUrl.startsWith('data:application/pdf')) {
      try {
        const base64Data = resumeUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      } catch (err) {
        console.error("Error opening PDF blob:", err);
      }
    } else {
      // Standard relative path or web URL
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-layout">
        <div className="hero-content">
          <div className="badge-pulse">
            <span className="pulse-circle"></span>
            {portfolioData.hero?.status || "STATUS: AVAILABLE FOR OPPORTUNITIES"}
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-accent">Rohit Zade</span>
          </h1>

          <div className="typewriter-line">
            &gt; <span>{roles[roleIdx].substring(0, charIdx)}</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-desc">{portfolioData.hero?.bioText}</p>

          <div className="hero-cta">
            <a href="#projects" className="btn-pill btn-primary">
              Explore Work
            </a>
            {/* Clickable Resume Button */}
            <button
              onClick={handleOpenResume}
              className="btn-pill"
              style={{ cursor: 'pointer' }}
            >
              View Resume
            </button>
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
              <p>React &amp; Web APIs</p>
            </div>
          </div>
        </div>

        <div
          className="hero-avatar-frame"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div className="avatar-wrapper glass-card">
            <img
              src={portfolioData.hero?.profileImg || "/pic.jpg"}
              alt="Rohit Zade"
              className="hero-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500";
              }}
            />
          </div>

          <div
            className="photo-socials"
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}
          >
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            )}

            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}

            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title="X (Twitter)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}

            {socials.email && (
              <a
                href={socials.email}
                className="social-icon-btn"
                title="Send Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l9.522 7.717 9.518-7.717v11.817h-19.04z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};