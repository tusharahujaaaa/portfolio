import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ENTERPRISE_PROJECTS } from "../../constants";
import "./ProjectDetail.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = ENTERPRISE_PROJECTS.find((p) => p.slug === slug);

  useGSAP(
    () => {
      if (!project) return;

      const tl = gsap.timeline();

      gsap.set(".detail-header, .detail-section", {
        autoAlpha: 0,
        y: 30,
      });

      tl.to(".detail-header", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(".detail-section", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=0.5");
    },
    { scope: containerRef, dependencies: [project] }
  );

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-container" ref={containerRef}>
      <button className="back-btn magnetic" onClick={() => navigate("/")}>
        <span>←</span> Back to Portfolio
      </button>

      <header className="detail-header">
        <div className="badge">{project.confidential ? "🔒 Confidential Enterprise Project" : "🚀 Production Deployment"}</div>
        <h1>{project.title}</h1>
        <p className="tagline">{project.tagline}</p>
      </header>

      <div className="detail-grid">
        <section className="detail-section overview glass-panel">
          <h3>Overview</h3>
          <p>{project.overview}</p>
        </section>

        <section className="detail-section role glass-panel">
          <h3>My Role</h3>
          <p>{project.role}</p>
        </section>

        <section className="detail-section stack glass-panel">
          <h3>Technological Stack</h3>
          <div className="tech-chips">
            {project.stack.map((tech, i) => (
              <span key={i} className="tech-chip">{tech}</span>
            ))}
          </div>
        </section>

        <section className="detail-section features glass-panel">
          <h3>Key Features</h3>
          <ul>
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section impact glass-panel">
          <h3>Impact & Metrics</h3>
          <p>{project.impact}</p>
        </section>

        <section className="detail-section architecture glass-panel">
          <h3>System Architecture</h3>
          <div className="arch-visual">
             <div className="arch-node">Client</div>
             <div className="arch-arrow">→</div>
             <div className="arch-node">Frontend</div>
             <div className="arch-arrow">→</div>
             <div className="arch-node">API / Backend</div>
             <div className="arch-arrow">→</div>
             <div className="arch-node">DB</div>
          </div>
          <p className="tiny-desc">Scalable production architecture optimized for handling enterprise-level traffic.</p>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
