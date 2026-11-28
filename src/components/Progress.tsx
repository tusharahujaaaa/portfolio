import { useEffect, useRef } from 'react';
import { clamp } from '../lib/env';

/** Thin scroll-progress bar fixed to the top of the page. */
export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const d = document.documentElement;
      if (ref.current) ref.current.style.transform = `scaleX(${clamp(scrollY / Math.max(1, d.scrollHeight - innerHeight), 0, 1)})`;
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}
