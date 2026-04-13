import { useRef } from "react";
import "./Skills.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SKILL_CATEGORIES } from "../../constants";

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".skill-tag");
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // 1. Cards come from below
      scrollTimeline
        .fromTo(
          cards,
          { y: 100, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1, ease: "power2.out" },
        )
        // 2. Pause while scrolling through section
        .to({}, { duration: 1.5 })
        // 3. Cards go up and become visibility: hidden
        .to(cards, {
          y: -100,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.in",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="skills-section" id="skills">
      <div className="section-header">
        <h2>Expertise & Skills</h2>
        <div className="header-line"></div>
      </div>

      <div className="skills-container">
        {SKILL_CATEGORIES.map((category, idx) => (
          <div className="skill-category" key={idx}>
            <h3 className="category-title">{category.title}</h3>
            <div className="tags-container">
              {category.skills.map((skill, sIdx) => (
                <div className="glass-panel skill-tag" key={sIdx}>
                  <span className="tag-text">{skill}</span>
                  <div className="tag-glow"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
