import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="section-header">
        <h2>About Me</h2>
        <div className="header-line"></div>
      </div>
      <div className="about-grid">
        <div className="glass-panel about-card">
          <div className="card-icon">🧠</div>
          <h3>Engineering Mindset</h3>
          <p>I don't just write code; I design systems. Every line is an intentional decision to build scalable, maintainable, and efficient architectures.</p>
        </div>
        <div className="glass-panel about-card">
          <div className="card-icon">🏢</div>
          <h3>Enterprise Experience</h3>
          <p>Proven track record of building and optimizing large-scale applications capable of handling massive traffic dynamically.</p>
        </div>
        <div className="glass-panel about-card">
          <div className="card-icon">⚡</div>
          <h3>Full-Stack Thinking</h3>
          <p>From seamless frontend integrations to robust database schemas, I stitch the entire stack together flawlessly.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
