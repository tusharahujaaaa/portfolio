import React, { useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="glass-panel contact-container">
        <h2>Let's Build Something Great.</h2>
        <p>I'm constantly exploring new systems and pushing performance boundaries.</p>
        
        <div className="contact-links">
          <a href="mailto:tushar.ahuja@example.com" className="contact-btn">
            <span className="icon">✉️</span> Email Me
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-btn">
            <span className="icon">🐙</span> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-btn">
            <span className="icon">💼</span> LinkedIn
          </a>
        </div>
      </div>
      <footer className="footer-content">
        Designed & Engineered by Tushar Ahuja
      </footer>
    </section>
  );
};

export default Contact;
