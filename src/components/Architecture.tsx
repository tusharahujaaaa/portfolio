import React, { useEffect, useRef } from 'react';
import './Architecture.css';

const Architecture = () => {
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
    <section ref={sectionRef} className="architecture-section" id="architecture">
      <div className="section-header">
        <h2>Full Stack Architecture</h2>
        <div className="header-line"></div>
      </div>
      
      <div className="arch-diagram glass-panel">
        <div className="arch-node frontend">
          <h4>Frontend</h4>
          <p>Angular / React</p>
        </div>
        
        <div className="arch-arrow">
          <div className="line"></div>
          <div className="arrow-head"></div>
        </div>

        <div className="arch-node backend">
          <h4>Backend API</h4>
          <p>Node.js / Express</p>
        </div>

        <div className="arch-arrow">
          <div className="line"></div>
          <div className="arrow-head"></div>
        </div>

        <div className="arch-node database">
          <h4>Database</h4>
          <p>PostgreSQL</p>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
