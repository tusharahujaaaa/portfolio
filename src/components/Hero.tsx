import { useRef } from "react";
import "./Hero.css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, SplitText);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Setup initial states
      gsap.set(".hero-content", {
        autoAlpha: 0,
        y: 60,
        scale: 0.98,
        filter: "blur(15px)",
      });

      const splitGreetings = new SplitText(".hero-greeting", { type: "chars" });
      const splitTitle = new SplitText(".hero-title", { type: "lines" });

      tl.to(".hero-content", {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
      })
        .from(splitGreetings.chars, {
          opacity: 0,
          y: -20,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(2)",
        }, "-=1")
        .from(splitTitle.lines, {
          opacity: 0,
          y: 30,
          rotationX: -15,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        }, "-=0.8")
        .from(".hero-subtitle", {
          opacity: 0,
          y: 20,
          duration: 0.8,
        }, "-=0.5")
        .from(".btn", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.5");

      // Magnetic effect logic
      const magneticElements = gsap.utils.toArray(".magnetic") as HTMLElement[];
      magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = el.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);

          gsap.to(el, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.5,
            ease: "power2.out",
          });
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
      <div className="hero-content">
        <div className="glass-panel text-container">
          <p className="hero-greeting">
            Hi, I'm Tushar Ahuja <span className="wave">👋</span>
          </p>
          <h1 className="hero-title">
            Engineering{" "}
            <span className="gradient-text gradient-glow">Scalable</span> Full
            Stack Systems &{" "}
            <span className="gradient-text">High-Performance</span> Applications
          </h1>
          <p className="hero-subtitle">
            Focus on performance, robust architecture, and end-to-end system
            thinking.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary magnetic">
              View Work
              <div className="btn-glow"></div>
            </a>
            <a href="#contact" className="btn btn-secondary magnetic">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
