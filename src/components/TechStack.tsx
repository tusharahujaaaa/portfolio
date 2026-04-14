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
      const items = gsap.utils.toArray(".tech-item") as HTMLElement[];

      if (triggerElem && items.length > 0) {
        gsap.fromTo(
          items,
          { autoAlpha: 0, scale: 0.5, y: 50 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: triggerElem,
              start: "top 85%",
            },
          },
        );

        // 3D Tilt Effect
        items.forEach((item) => {
          item.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(item, {
              rotationY: x * 30,
              rotationX: -y * 30,
              transformPerspective: 1000,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(item, {
              rotationY: 0,
              rotationX: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.3)",
            });
          });
        });
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
        {TECH_STACK.map((tech, idx) => {
          const IconComponent = tech.icon;

          return (
            <div className="tech-item glass-panel" key={idx}>
              {tech.isImg ? (
                <img className="tech-emoji" src={tech.img} alt={tech.name} />
              ) : (
                <div className="tech-emoji">
                  {IconComponent && (
                    <IconComponent
                      size={42}
                      strokeWidth={1.5}
                      color="#6366f1"
                    />
                  )}
                </div>
              )}
              <div className="tech-name">{tech.name}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;
