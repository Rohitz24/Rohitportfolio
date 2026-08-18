import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting...');
    try {
      const response = await fetch('https://formspree.io/f/xaqrvorv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('Message delivered successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch {
      setStatus('Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-wrapper">
        <div className="section-header">
          <p className="section-tag">// GET IN TOUCH</p>
          <h2 className="section-title">Send a Message</h2>
        </div>

        <div className="glass-card">
          <div className="terminal-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-filename">transmit_message.sh</span>
          </div>
          <form className="form-padding" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">&gt; FULL NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rohit Zade"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">&gt; EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rohit@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">&gt; SUBJECT</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Opportunity"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">&gt; MESSAGE</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project or query..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-pill btn-primary" style={{ marginTop: '0.5rem' }}>
              Transmit Message
            </button>
            {status && (
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};