import { useRef } from "react";
import "./Contact.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const triggerElem =
        sectionRef.current?.querySelector(".contact-container");
      const elements = gsap.utils.toArray(
        ".contact-container h2, .contact-container p, .contact-btn",
      );

      if (triggerElem && elements.length > 0) {
        gsap.fromTo(
          elements,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
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
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="glass-panel contact-container">
        <h2>Let's Build Something Great.</h2>
        <p>
          I'm constantly exploring new systems and pushing performance
          boundaries.
        </p>

        <div className="contact-links">
          <a href="mailto:tushar.ahuja@example.com" className="contact-btn">
            <span className="icon">✉️</span> Email Me
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            <span className="icon">🐙</span> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            <span className="icon">💼</span> LinkedIn
          </a>
        </div>
      </div>
      <footer className="footer-content">
        Designed & Engineered by Tushar Ahuja
      </footer>
    </section>
  );
};

export default Contact;
