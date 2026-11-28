import { useEffect } from 'react';
import { Background } from './components/Background';
import { Cursor } from './components/Cursor';
import { Progress } from './components/Progress';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Work } from './components/Work';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useChoreography } from './hooks/useChoreography';
import { startSmoothScroll, scrollToHash } from './lib/smoothScroll';

export default function App() {
  /* Lenis smooth scroll + "#section" links scroll smoothly (one delegated listener). */
  useEffect(() => {
    const stop = startSmoothScroll();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute('href');
      if (!a || !id || id.length < 2) return;
      if (scrollToHash(id)) e.preventDefault();
    };
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('click', onClick); stop(); };
  }, []);

  useChoreography();

  return (
    <>
      <Progress />
      <Background />
      <div className="veil" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Skills />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
