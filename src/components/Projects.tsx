import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENTERPRISE_PROJECTS } from "../../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = ENTERPRISE_PROJECTS.filter((p) => p.isFeatured);
  const otherProjects = ENTERPRISE_PROJECTS.filter((p) => !p.isFeatured);

  const getProjectImage = (slug: string) => {
    const images: Record<string, string> = {
      govintranet: "images/projects/govin.png",
      etaal: "images/projects/etaal.png",
      "digicel-selfcare": "images/projects/digicel.png",
      "dhoom-dhaam": "images/projects/dhoomdhaam.png",
      // "billing-tracker": "images/projects/ccl.png", // Fallback for now or reuse one
    };
    return images[slug] || "images/image.png";
  };

  useGSAP(
    () => {
      // 1. Scroll Entrance Animations
      const cards = gsap.utils.toArray(".featured-card");
      cards.forEach((card: any) => {
        const content = card.querySelector(".featured-card-content");
        const visual = card.querySelector(".featured-card-visual");

        // Text slide in from left
        gsap.from(content, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });

        // Image reveal with scale
        gsap.from(visual, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });

        // Floating animation for the mockup image
        const mockup = card.querySelector(".project-mockup");
        if (mockup) {
          gsap.to(mockup, {
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2, // Stagger the start of floating
          });
        }
      });

      // Section Header reveal
      gsap.from(".section-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef },
  );

  // Mouse Move Tilt Effect Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const mockup = card.querySelector(".project-mockup") as HTMLElement;
    if (!mockup) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20; // Subtle rotation
    const rotateY = (centerX - x) / 20;

    gsap.to(mockup, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const mockup = e.currentTarget.querySelector(
      ".project-mockup",
    ) as HTMLElement;
    if (!mockup) return;

    gsap.to(mockup, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="section-header">
        <h2>Featured Work</h2>
        <div className="header-line"></div>
      </div>

      <div className="featured-projects-list" ref={containerRef}>
        {featuredProjects.map((proj, idx) => (
          <div
            key={idx}
            className="featured-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="featured-card-content">
              <span className="featured-badge">featured project</span>
              <span className="featured-tagline">{proj.tagline}</span>
              <h3>{proj.title}</h3>
              <p className="featured-desc">{proj.desc}</p>

              <div className="tech-chips">
                {proj.stack.slice(0, 4).map((tech, i) => (
                  <span key={i} className="tech-chip">
                    {tech}
                  </span>
                ))}
                {proj.stack.length > 4 && (
                  <span className="tech-chip">
                    +{proj.stack.length - 4} more
                  </span>
                )}
              </div>

              <Link to={`/projects/${proj.slug}`} className="cta-button">
                View Case Study <span className="arrow">→</span>
              </Link>
            </div>
            <div className="featured-card-visual">
              <div className="visual-glow"></div>
              <div className="visual-inner">
                <img
                  src={getProjectImage(proj.slug)}
                  alt={proj.title}
                  className="project-mockup"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="other-projects-section">
        <div className="other-projects-header">
          <h3>Other Notable Projects</h3>
          <button
            className="view-all-toggle"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Hide Projects" : "View All Projects"}
            <span
              style={{
                transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              ▼
            </span>
          </button>
        </div>

        {showAll && (
          <div className="other-projects-grid">
            {otherProjects.map((proj, idx) => (
              <Link
                to={`/projects/${proj.slug}`}
                className="other-card"
                key={idx}
              >
                <h4>{proj.title}</h4>
                <p>{proj.tagline}</p>
                <div className="other-card-link">
                  Details <span className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
