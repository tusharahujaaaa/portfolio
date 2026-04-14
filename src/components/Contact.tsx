import { useRef } from "react";
import "./Contact.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "../../constants";

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
          {SOCIAL_LINKS.map((link, idx) => {
            const IconComponent = link.icon;
            return (
              <a
                key={idx}
                href={link.href}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noreferrer" : undefined}
                className="contact-btn"
              >
                {link.isImg ? (
                  <img
                    src={link.img}
                    alt={link.name}
                    style={{ width: "24px", height: "24px" }}
                  />
                ) : (
                  IconComponent && (
                    <IconComponent
                      size={24}
                      strokeWidth={1.5}
                      color="#6366f1"
                    />
                  )
                )}
                {link.name === "Email" ? "Email Me" : link.name}
              </a>
            );
          })}
        </div>
      </div>
      <footer className="footer-content">
        Designed & Engineered by Tushar Ahuja
      </footer>
    </section>
  );
};

export default Contact;
