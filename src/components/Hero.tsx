import { useRef } from "react";
import "./Hero.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Setup initial states for a clean entry
      gsap.set([".hero-greeting", ".hero-title", ".hero-credibility", ".hero-subtitle", ".hero-ctas"], {
        opacity: 0,
        y: 30,
      });

      tl.to(".hero-greeting", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      }, "-=0.4")
      .to(".hero-credibility", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .to(".hero-ctas", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.4");

      // Floating background blob animation
      gsap.to(".hero-background-blob", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Magnetic effect logic for buttons
      const magneticElements = gsap.utils.toArray(".magnetic") as HTMLElement[];
      magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e as MouseEvent;
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);

          gsap.to(el, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.5,
            ease: "power2.out",
          });

          // Also update CSS variables for the glow effect
          el.style.setProperty("--x", `${(clientX - left)}px`);
          el.style.setProperty("--y", `${(clientY - top)}px`);
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-background-blob"></div>
      <div className="hero-content">
        <div className="text-container">
          <span className="hero-greeting">
            Hi, I'm Tushar Ahuja <span className="wave">👋</span>
          </span>
          <h1 className="hero-title">
            Engineering <span className="highlight">Scalable</span> Full Stack 
            Systems & <span className="highlight">High-Performance</span> Applications
          </h1>
          <p className="hero-credibility">
            Built enterprise applications for government systems, telecom platforms, 
            and data-intensive dashboards used by thousands of users.
          </p>
          <p className="hero-subtitle">
            Focus on performance, robust architecture, and end-to-end system thinking 
            for the next generation of digital products.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary magnetic">
              View Work
              <div className="btn-glow"></div>
            </a>
            <a href="#contact" className="btn btn-secondary magnetic">
              Contact Me
              <div className="btn-glow"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
