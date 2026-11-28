import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { fine, reduce } from '../lib/env';

type Props = ComponentPropsWithoutRef<'a'> & { ghost?: boolean; magnetic?: boolean };

/** Pill-shaped link that gently follows the pointer (desktop only). */
export function Pill({ ghost, magnetic = true, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || !fine || reduce) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [magnetic]);
  return <a ref={ref} className={`pill${magnetic ? ' mag' : ''}${ghost ? ' ghost' : ''} ${className}`.trim()} {...rest}>{children}</a>;
}

export const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
);
