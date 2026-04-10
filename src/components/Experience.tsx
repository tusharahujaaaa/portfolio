import { useRef } from "react";
import "./Experience.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".timeline-item");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const experiences = [
    {
      company: "NetProphets Cyberworks",
      role: "Software Engineer",
      period: "2021 — Present",
      description:
        "Engineered scalable full-stack enterprise solutions, leading architectural decisions and significantly reducing latency across multiple applications.",
      highlights: [
        "Optimized critical API endpoints leading to an 80% reduction in load time.",
        "Spearheaded the migration of legacy system architecture to modern Node.js and scalable PostgreSQL structures.",
        "Mentored junior engineers and streamlined the CI/CD pipeline, reducing deployment failures.",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="experience-section" id="experience">
      <div className="section-header">
        <h2>Experience</h2>
        <div className="header-line"></div>
      </div>

      <div className="timeline">
        {experiences.map((exp, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-dot"></div>
            <div className="glass-panel timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 className="role">{exp.role}</h3>
                  <h4 className="company">{exp.company}</h4>
                </div>
                <div className="period">{exp.period}</div>
              </div>
              <p className="description">{exp.description}</p>
              <ul className="highlights">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
