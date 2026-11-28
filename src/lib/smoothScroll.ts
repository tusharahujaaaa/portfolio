import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { reduce } from './env';

let lenis: Lenis | null = null;

/** Start Lenis smooth scrolling, wired into GSAP's ticker. Returns a cleanup function. */
export function startSmoothScroll() {
  if (reduce) return () => {};
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Smooth-scroll to a "#section" hash (or top). Falls back to native smooth scroll. */
export function scrollToHash(hash: string) {
  const target = hash === '#top' ? document.body : document.querySelector<HTMLElement>(hash);
  if (!target) return false;
  if (lenis) lenis.scrollTo(hash === '#top' ? 0 : target, { duration: 1.7, easing: (x: number) => 1 - Math.pow(1 - x, 4) });
  else target.scrollIntoView({ behavior: 'smooth' });
  return true;
}
