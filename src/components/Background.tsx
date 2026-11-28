import { useEffect, useRef } from 'react';
import { initScene, S } from '../lib/scene';
import { reduce } from '../lib/env';

/**
 * Fixed full-screen WebGL canvas (the orange core). Falls back to a CSS glow if WebGL is unavailable.
 * The intro (core growing from nothing) starts only once fonts are ready and a few frames have rendered,
 * and it advances with a capped time step so a slow first frame can never skip it.
 */
export function Background() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'gl';
    canvas.setAttribute('aria-hidden', 'true');
    host.current!.appendChild(canvas);
    const gl = initScene(canvas, { reduced: reduce });
    const root = document.documentElement;
    let raf = 0, dead = false;

    if (!gl) {
      root.classList.add('no-gl');
      canvas.remove();
    } else {
      root.classList.remove('no-gl');
      S.intro = reduce ? 1 : 0;
      if (!reduce) {
        const DURATION = 2.2, DELAY = 0.25;
        const start = () => {
          let frames = 0, t = 0, last = performance.now();
          const step = (now: number) => {
            if (dead) return;
            const dt = Math.min((now - last) / 1000, 0.05); last = now;
            if (++frames > 3) t += dt; // let the first frames (shader upload, layout) pass untimed
            const p = Math.min(Math.max((t - DELAY) / DURATION, 0), 1);
            S.intro = 1 - Math.pow(1 - p, 3);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        };
        (document.fonts?.ready ?? Promise.resolve()).then(() => { if (!dead) start(); });
      }
    }
    return () => { dead = true; cancelAnimationFrame(raf); gl?.dispose(); canvas.remove(); };
  }, []);
  return <div ref={host} style={{ display: 'contents' }} />;
}
