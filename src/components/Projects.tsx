import React, { useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
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

  const enterpriseProjects = [
    { title: "GovIntra", desc: "Internal governance portal scaling up to handle thousands of concurrent operations securely." },
    { title: "CCL System", desc: "Complex logistics and clearings system built with heavy full-stack optimizations." },
    { title: "Billing Tracker", desc: "Financial ledger capable of precise arithmetic and high-level data aggregation." },
    { title: "Digicel SelfCare", desc: "Telecom customer portal serving vast amounts of users with low latency." }
  ];

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="section-header">
        <h2>Selected Work</h2>
        <div className="header-line"></div>
      </div>
      
      <div className="featured-project-container">
        <div className="featured-badge">⭐ Featured Personal Project</div>
        <div className="glass-panel featured-project">
          <div className="featured-content">
            <h3 className="project-title">AI Insights Dashboard</h3>
            <p className="project-desc">
              A high-performance UI-driven real estate & financial insights application. Uses a scalable Node + PostgreSQL backend and React with dynamic visualizations to provide predictive actions and reporting.
            </p>
            <div className="project-stack">
              <span>React</span>
              <span>Node.js</span>
              <span>PostgreSQL</span>
              <span>OpenAI API</span>
            </div>
          </div>
          <div className="featured-visual">
            <div className="mock-ui">
              <div className="mock-header"></div>
              <div className="mock-chart"></div>
              <div className="mock-blocks">
                <div className="mock-block"></div>
                <div className="mock-block"></div>
                <div className="mock-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="sub-heading">Enterprise Deployments</h3>
      <div className="projects-grid">
        {enterpriseProjects.map((proj, idx) => (
          <div className="glass-panel project-card" key={idx}>
            <h4>{proj.title}</h4>
            <p>{proj.desc}</p>
            <div className="project-link">
              View Specifics <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
