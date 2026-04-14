import { useRef } from "react";
import "./Architecture.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Architecture = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const triggerElem = sectionRef.current?.querySelector(".arch-diagram");
      const nodes = gsap.utils.toArray(".arch-node");
      const arrows = gsap.utils.toArray(".arch-arrow");

      if (triggerElem) {
        // Initial reveal
        gsap.fromTo(
          [...nodes, ...arrows],
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerElem,
              start: "top 85%",
            },
          },
        );

        // Continuous Flow Animation
        const flowTl = gsap.timeline({ repeat: -1 });

        nodes.forEach((node: any, index) => {
          // Glow Node
          flowTl.to(node, {
            boxShadow: "0 0 20px rgba(100, 108, 255, 0.6)",
            borderColor: "rgba(100, 108, 255, 0.8)",
            duration: 0.5,
          });

          // Animate Arrow if not last
          if (index < arrows.length) {
            const arrow = arrows[index] as HTMLElement;
            flowTl
              .to(arrow.querySelector(".line"), {
                backgroundColor: "#646cff",
                scaleY: 1.5,
                duration: 0.3,
              })
              .to(arrow.querySelector(".arrow-head"), {
                borderLeftColor: "#646cff",
                scale: 1.3,
                duration: 0.2,
              });
          }

          // Reset Node
          flowTl.to(node, {
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderColor: "rgba(255,255,255,0.1)",
            duration: 0.5,
          });

          if (index < arrows.length) {
            const arrow = arrows[index] as HTMLElement;
            flowTl
              .to(
                arrow.querySelector(".line"),
                {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  scaleY: 1,
                  duration: 0.3,
                },
                "-=0.3",
              )
              .to(
                arrow.querySelector(".arrow-head"),
                {
                  borderLeftColor: "rgba(255,255,255,0.2)",
                  scale: 1,
                  duration: 0.2,
                },
                "-=0.2",
              );
          }
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="architecture-section"
      id="architecture"
    >
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
