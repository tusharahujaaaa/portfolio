import { useEffect, useRef } from 'react';
import { fine, reduce } from '../lib/env';

/** Custom cursor ring that trails the mouse and grows over interactive elements. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ring = ref.current;
    if (!ring || !fine || reduce) return;
    let rx = 0, ry = 0, px = 0, py = 0, first = true, raf = 0;
    const hide = () => ring.classList.remove('on');
    const move = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY;
      if (first) { rx = px; ry = py; first = false; }
      ring.classList.add('on');
    };
    const over = (e: PointerEvent) => ring.classList.toggle('big', !!(e.target as Element).closest('a, button, .card, .tile, .face'));
    const loop = () => { rx += (px - rx) * 0.2; ry += (py - ry) * 0.2; ring.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    addEventListener('blur', hide);
    document.addEventListener('visibilitychange', hide);
    document.addEventListener('pointerover', over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', hide);
      removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', hide);
      document.removeEventListener('pointerover', over);
    };
  }, []);
  return <div className="ring" id="ring" ref={ref} aria-hidden="true" />;
}
