import Hero from "../components/Hero";

import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Architecture from "../components/Architecture";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useGSAP(() => {
    const sections = gsap.utils.toArray("section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Architecture />
      <TechStack />
      <Contact />
    </>
  );
};

export default Home;

