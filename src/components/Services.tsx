import { useRef } from 'react';
import { services } from '../data/content';
import { fine, reduce } from '../lib/env';
import { Chars } from './Split';

/** Service tile with a pointer-following spotlight and a slight 3D tilt. */
function Tile({ n, title, text }: { n: string; title: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const t = ref.current!, r = t.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    t.style.setProperty('--mx', x + 'px'); t.style.setProperty('--my', y + 'px');
    if (!reduce && fine) t.style.transform = `perspective(900px) rotateX(${((y / r.height) - 0.5) * -9}deg) rotateY(${((x / r.width) - 0.5) * 9}deg)`;
  };
  return (
    <div className="tw">
      <div className="tile" data-n={n} ref={ref} onPointerMove={move} onPointerLeave={() => { ref.current!.style.transform = ''; }}>
        <div><h3>{title}</h3><p>{text}</p></div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="block wrap" id="services">
      <div className="sec-head">
        <h2 className="title" data-chars aria-label="Hire me for"><Chars text="Hire me for" /></h2>
        <p className="note">Freelance work I take on, from a single feature to a full upgrade.</p>
      </div>
      <div className="svc">
        {services.map((s, i) => <Tile key={s.title} n={String(i + 1).padStart(2, '0')} title={s.title} text={s.text} />)}
      </div>
    </section>
  );
}
