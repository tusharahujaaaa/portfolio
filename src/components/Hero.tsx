import { useEffect, useState } from "react";
import "./Hero.css";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 150);
  }, []);

  useGSAP(() => {
    const spllitGreetings = new SplitText(".hero-greeting", { type: "chars" });
    const splitTitle = new SplitText(".hero-title", { type: "lines" });

    gsap.from(spllitGreetings.chars, {
      opacity: 0.4,
      yPercent: -50,
      stagger: 0.05,
      ease: "expo.out",
      delay: 0.5,
    });

    gsap.from(splitTitle.lines, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.4,
      ease: "expo.out",
      delay: 0.6,
    });
  });

  return (
    <section className="hero-section">
      <div className={`hero-content ${loaded ? "loaded" : ""}`}>
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
