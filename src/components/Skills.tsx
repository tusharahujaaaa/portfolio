import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["Angular (v17+)", "React", "RxJS", "TypeScript", "JavaScript"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "Data Modeling", "Query Optimization"]
    },
    {
      title: "Core",
      skills: ["System Design", "Performance Optimization", "Scalable Architecture"]
    }
  ];

  return (
    <section ref={sectionRef} className="skills-section" id="skills">
      <div className="section-header">
        <h2>Expertise & Skills</h2>
        <div className="header-line"></div>
      </div>
      
      <div className="skills-container">
        {skillCategories.map((category, idx) => (
          <div className="skill-category" key={idx}>
            <h3 className="category-title">{category.title}</h3>
            <div className="tags-container">
              {category.skills.map((skill, sIdx) => (
                <div className="glass-panel skill-tag" key={sIdx}>
                  <span className="tag-text">{skill}</span>
                  <div className="tag-glow"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
