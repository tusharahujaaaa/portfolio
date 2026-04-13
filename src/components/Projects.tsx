import { useRef } from "react";
import "./Projects.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENTERPRISE_PROJECTS } from "../../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Featured Project Reveal
      const featuredContainer = sectionRef.current?.querySelector(
        ".featured-project-container",
      );
      if (featuredContainer) {
        gsap.fromTo(
          featuredContainer,
          { autoAlpha: 0, scale: 0.95, y: 30 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredContainer,
              start: "top 85%",
            },
          },
        );
      }

      // 2. Project Grid cards stagger
      const gridContainer = sectionRef.current?.querySelector(".projects-grid");
      const cards = gsap.utils.toArray(".project-card");
      if (gridContainer && cards.length) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridContainer,
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

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
              A high-performance UI-driven real estate & financial insights
              application. Uses a scalable Node + PostgreSQL backend and React
              with dynamic visualizations to provide predictive actions and
              reporting.
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
        {ENTERPRISE_PROJECTS.map((proj, idx) => (
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
