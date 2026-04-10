import React, { useRef } from 'react';
import './Architecture.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Architecture = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const triggerElem = sectionRef.current?.querySelector('.arch-diagram');
    const elements = gsap.utils.toArray('.arch-node, .arch-arrow');
    
    if (triggerElem && elements.length > 0) {
      gsap.fromTo(elements, 
        { autoAlpha: 0, x: -30 },
        { 
          autoAlpha: 1, 
          x: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: triggerElem,
            start: 'top 85%'
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="architecture-section" id="architecture">
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
