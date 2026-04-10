import { useRef } from "react";
import "./About.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".section-header h2", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 90%",
        },
      });

      gsap.from(".header-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 90%",
        },
      });

      // 2. Card Scrub Timeline
      const cards = gsap.utils.toArray(".about-card");
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Cards come from below with a slight rotation and scale
      scrollTimeline
        .fromTo(
          cards,
          { y: 100, autoAlpha: 0, scale: 0.9, rotationX: -10 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationX: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          },
        )
        .to({}, { duration: 1.5 }) // Pause in viewport
        .to(cards, {
          y: -100,
          autoAlpha: 0,
          scale: 0.9,
          rotationX: 10,
          stagger: 0.1,
          duration: 1,
          ease: "power2.in",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="section-header">
        <h2>About Me</h2>
        <div className="header-line"></div>
      </div>
      <div className="about-grid">
        <div className="glass-panel about-card">
          <div className="card-icon">🧠</div>
          <h3>Engineering Mindset</h3>
          <p>
            I don't just write code; I design systems. Every line is an
            intentional decision to build scalable, maintainable, and efficient
            architectures.
          </p>
        </div>
        <div className="glass-panel about-card">
          <div className="card-icon">🏢</div>
          <h3>Enterprise Experience</h3>
          <p>
            Proven track record of building and optimizing large-scale
            applications capable of handling massive traffic dynamically.
          </p>
        </div>
        <div className="glass-panel about-card">
          <div className="card-icon">⚡</div>
          <h3>Full-Stack Thinking</h3>
          <p>
            From seamless frontend integrations to robust database schemas, I
            stitch the entire stack together flawlessly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
