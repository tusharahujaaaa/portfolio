import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pill } from './Pill';

const SECTIONS = ['work', 'skills', 'about', 'contact'] as const;

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const triggers = SECTIONS.map(id =>
      ScrollTrigger.create({ trigger: '#' + id, start: 'top 55%', end: 'bottom 45%', refreshPriority: -1, onToggle: s => { if (s.isActive) setActive(id); } })
    );
    return () => triggers.forEach(t => t.kill());
  }, []);

  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Tushar Ahuja, back to top">Tushar Ahuja</a>
      <nav aria-label="Sections">
        {SECTIONS.map(id => (
          <a key={id} href={'#' + id} aria-current={active === id}>{id[0].toUpperCase() + id.slice(1)}</a>
        ))}
      </nav>
      <Pill href="#contact">Hire me</Pill>
    </header>
  );
}
