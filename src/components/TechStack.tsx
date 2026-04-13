import { useRef } from "react";
import "./TechStack.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_STACK } from "../../constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const triggerElem = sectionRef.current?.querySelector(".tech-grid");
      const items = gsap.utils.toArray(".tech-item");

      if (triggerElem && items.length > 0) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, scale: 0.5, rotation: 15 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: triggerElem,
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="techstack-section" id="stack">
      <div className="section-header">
        <h2>Core Technologies</h2>
        <div className="header-line"></div>
      </div>

      <div className="tech-grid">
        {TECH_STACK.map((tech, idx) => (
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
