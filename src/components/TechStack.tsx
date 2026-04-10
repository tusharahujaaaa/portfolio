import React, { useEffect, useRef } from 'react';
import './TechStack.css';

const TechStack = () => {
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

  const techIcons = [
    { name: "React", emoji: "⚛️" },
    { name: "Node.js", emoji: "🟢" },
    { name: "Angular", emoji: "🅰️" },
    { name: "PostgreSQL", emoji: "🐘" },
    { name: "TypeScript", emoji: "📘" },
    { name: "RxJS", emoji: "🟣" }
  ];

  return (
    <section ref={sectionRef} className="techstack-section" id="stack">
      <div className="section-header">
        <h2>Core Technologies</h2>
        <div className="header-line"></div>
      </div>
      
      <div className="tech-grid">
        {techIcons.map((tech, idx) => (
          <div className="tech-item glass-panel" key={idx}>
            <div className="tech-emoji">{tech.emoji}</div>
            <div className="tech-name">{tech.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
