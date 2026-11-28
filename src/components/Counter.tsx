import { useEffect, useRef, useState } from 'react';
import { clamp, reduce } from '../lib/env';

interface Props { to: number; dec?: number; suffix?: string; unit?: 'KB' }

/**
 * Number that counts up when its nearest `[data-reveal]` ancestor fires a "reveal" event
 * (the scroll choreography dispatches it the first time the card / stats row is seen).
 */
export function Counter({ to, dec = 0, suffix = '', unit }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(to);

  useEffect(() => {
    const host = ref.current?.closest('[data-reveal]');
    if (!host || reduce) return;
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const step = (now: number) => {
        const p = clamp((now - t0) / 1500, 0, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    host.addEventListener('reveal', run);
    return () => { host.removeEventListener('reveal', run); cancelAnimationFrame(raf); };
  }, [to]);

  const n = unit === 'KB' ? (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) : (dec ? v.toFixed(dec) : String(Math.round(v)));
  return <b ref={ref}>{n}{unit ? ' KB' : suffix}</b>;
}
