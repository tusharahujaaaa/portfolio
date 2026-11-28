import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { S } from '../lib/scene';
import { clamp, reduce } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/** What the 3D core looks like while each section is on screen. */
const STATE = {
  hero:     { coreX: 2.95, coreY: 0.15, coreScale: 1.45, amp: 0.27, wire: 0.5,  rings: 1,   glow: 1,    projMix: 0, spin: 0.18 },
  work:     { coreX: 0,    coreY: 0,    coreScale: 2.7,  amp: 0.42, wire: 0.35, rings: 0.55, glow: 1.25, projMix: 1, spin: 0.34 },
  skills:   { coreX: -3.3, coreY: -0.1, coreScale: 1.25, amp: 0.3,  wire: 0.55, rings: 1,   glow: 0.9,  projMix: 0, spin: 0.2 },
  services: { coreX: 3.3,  coreY: -0.3, coreScale: 1.15, amp: 0.34, wire: 0.6,  rings: 0.8, glow: 0.8,  projMix: 0, spin: 0.25 },
  about:    { coreX: 3.6,  coreY: 1.5,  coreScale: 0.85, amp: 0.22, wire: 0.4,  rings: 0.7, glow: 0.7,  projMix: 0, spin: 0.12 },
  contact:  { coreX: -3.5, coreY: -2.0, coreScale: 0.78, amp: 0.3,  wire: 0.5,  rings: 0.8, glow: 0.9,  projMix: 0, spin: 0.2 }
} as const;
type StateKey = keyof typeof STATE;
type Pose = Record<string, number>;

/** First time a card / stats row is seen: mark it and tell any <Counter> inside to count up. */
function markSeen(el: Element) {
  if (el.classList.contains('seen')) return;
  el.classList.add('seen');
  el.dispatchEvent(new CustomEvent('reveal'));
}

/**
 * All scroll-driven animation for the page (GSAP ScrollTrigger).
 * 3D mode = pinned fly-through; flat mode (small screens / reduced motion) = simple reveals.
 * Everything is created inside gsap.matchMedia so it is fully reverted on unmount / breakpoint change.
 */
export function useChoreography() {
  useEffect(() => {
    Object.assign(S, STATE.hero);
    const root = document.documentElement;
    const trans: { prev: StateKey; key: StateKey; p: number }[] = [];

    /* Blend the scene pose from the furthest transition that has started. */
    const blend = () => {
      if (reduce || !trans.length) return;
      let k = -1;
      trans.forEach((r, i) => { if (r.p > 0) k = i; });
      if (k < 0) { Object.assign(S, STATE.hero); return; }
      const r = trans[k], A = STATE[r.prev] as Pose, B = STATE[r.key] as Pose, e = r.p * r.p * (3 - 2 * r.p);
      for (const key in A) (S as unknown as Pose)[key] = A[key] + (B[key] - A[key]) * e;
    };
    gsap.ticker.add(blend);

    const link = (prev: StateKey, key: StateKey, trigger: string | Element, start = 'top 85%', end = 'top 25%') => {
      if (reduce) return;
      const rec = { prev, key, p: 0 };
      trans.push(rec);
      ScrollTrigger.create({ trigger, start, end, onUpdate: s => { rec.p = s.progress; }, onRefresh: s => { rec.p = s.progress; } });
    };

    const mm = gsap.matchMedia();
    mm.add({
      d3: '(min-width: 1025px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)',
      flat: '(max-width: 1024px), (max-height: 619px), (prefers-reduced-motion: reduce)'
    }, ctx => {
      const is3d = !!ctx.conditions?.d3;
      let cleanup: (() => void) | null = null;
      root.dataset.mode = is3d ? '3d' : 'flat';
      trans.length = 0;

      /* ----- hero exit ----- */
      if (!reduce) {
        gsap.to('.hero-in', { rotateX: is3d ? 22 : 0, yPercent: is3d ? -14 : -8, z: is3d ? -260 : 0, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 15%', scrub: true } });
      }

      /* ----- section titles: characters flip in ----- */
      if (!reduce) $$('[data-chars]').forEach(el => {
        const chars = $$('.ch', el);
        const trigger = el.closest('#work') ? '#work' : el;
        gsap.from(chars, { rotateX: -95, yPercent: 70, opacity: 0, transformPerspective: 700, transformOrigin: '50% 100% -40px', duration: 1, ease: 'power3.out', stagger: 0.035,
          scrollTrigger: { trigger, start: is3d && el.closest('#work') ? 'top 60%' : 'top 85%', once: true } });
      });

      /* ----- WORK ----- */
      const workEl = $('#work')!;
      const cards = $$('.card');
      const n = cards.length;
      link('hero', 'work', workEl, 'top 90%', 'top 10%');

      /* --k scales the layout up on very large screens (see global.css) */
      const k = parseFloat(getComputedStyle(root).getPropertyValue('--k')) || 1;
      const fitCards = () => cards.forEach(c => {
        let fs = 16 * k; c.style.setProperty('--fs', fs + 'px');
        while (c.scrollHeight > c.clientHeight + 1 && fs > 10.5 * k) { fs -= 0.5; c.style.setProperty('--fs', fs + 'px'); }
      });

      if (is3d) {
        const hudNum = $('#wnum')!, hudFill = $('#wfill')!;
        let target = 0, cur = 0;
        const ease = (f: number) => { const x = clamp((f - 0.18) / 0.64, 0, 1); return x * x * (3 - 2 * x); };
        const layout = (pos: number) => {
          cards.forEach((c, i) => {
            const t = i - pos, s = i % 2 ? 1 : -1;
            let x: number, y: number, z: number, ry: number, rx: number, o: number;
            if (t >= 0) { const a = Math.min(t, 4); z = -a * 1000; x = s * a * 300; y = a * 70; ry = -s * a * 24; rx = a * 7; o = t > 3.3 ? 0 : clamp(1 - a * 0.8, 0, 1); }
            else { const u = Math.min(-t, 1.3); z = u * 950; x = -s * u * 380; y = -u * 120; ry = s * u * 36; rx = -u * 6; o = clamp(1 - u * 3.4, 0, 1); }
            c.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
            c.style.opacity = o.toFixed(3);
            c.style.visibility = o < 0.01 ? 'hidden' : 'visible';
            c.style.zIndex = String(t < 0 ? 200 + i : 100 - Math.round(t * 10));
            c.style.pointerEvents = Math.abs(t) < 0.35 ? 'auto' : 'none';
            if (Math.abs(t) < 0.4) markSeen(c);
          });
          const idx = clamp(Math.round(pos), 0, n - 1);
          hudNum.textContent = String(idx + 1).padStart(2, '0');
          hudFill.style.transform = `scaleX(${clamp(pos / (n - 1), 0, 1)})`;
          S.proj = pos;
        };
        const tick = () => { cur += (target - cur) * 0.14; if (Math.abs(target - cur) < 0.0005) cur = target; layout(cur); };
        gsap.ticker.add(tick);
        ScrollTrigger.addEventListener('refreshInit', fitCards);
        fitCards();
        ScrollTrigger.create({
          trigger: workEl, start: 'top top', end: () => '+=' + Math.round(innerHeight * (n - 1) * 0.9 + innerHeight * 0.25), pin: true, scrub: true, invalidateOnRefresh: true,
          onUpdate: self => {
            const raw = Math.min(self.progress * (n - 1 + 0.25 / 0.9), n - 1);
            const i = Math.floor(raw), f = raw - i;
            target = Math.min(i + ease(f), n - 1);
            if (raw >= n - 1) target = n - 1;
          }
        });
        layout(0);
        cleanup = () => {
          gsap.ticker.remove(tick); ScrollTrigger.removeEventListener('refreshInit', fitCards);
          cards.forEach(c => {
            ['transform', 'opacity', 'visibility', 'zIndex', 'pointerEvents'].forEach(p => c.style.removeProperty(p.replace(/[A-Z]/g, m => '-' + m.toLowerCase())));
            c.style.removeProperty('--fs'); c.classList.remove('seen');
          });
          S.proj = 0;
        };
      } else {
        cards.forEach(c => {
          c.style.setProperty('--fs', '');
          ScrollTrigger.create({ trigger: c, start: 'top 75%', once: true, onEnter: () => markSeen(c) });
          if (!reduce) gsap.from(c, { y: 70, rotateX: 8, opacity: 0, transformPerspective: 1000, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%', once: true } });
        });
      }

      /* ----- SKILLS ----- */
      link('work', 'skills', '.skills-pin', 'top 95%', 'top 25%');
      const faces = $$('.face'), ringRot = $('#ringrot')!;
      if (is3d) {
        const N = faces.length, step = 360 / N, Rr = 200 * k / Math.tan(Math.PI / N);
        faces.forEach((f, i) => { f.style.transform = `rotateY(${i * step}deg) translateZ(${Rr}px)`; });
        const spin = (deg: number) => {
          ringRot.style.transform = `translateZ(${-Rr}px) rotateY(${deg}deg)`;
          faces.forEach((f, i) => {
            const a = ((i * step + deg) % 360 + 540) % 360 - 180;
            const k = Math.max(Math.cos(a * Math.PI / 180), 0);
            f.style.opacity = (0.55 + 0.45 * Math.pow(k, 1.2)).toFixed(3);
            f.style.filter = `brightness(${(0.55 + 0.45 * k).toFixed(2)})`;
            f.style.borderColor = k > 0.96 ? 'rgba(255,176,74,.85)' : '';
            f.style.boxShadow = k > 0.96 ? '0 0 60px -10px rgba(255,90,31,.55), inset 0 1px 0 rgba(255,255,255,.1)' : '';
          });
        };
        spin(0);
        ScrollTrigger.create({ trigger: '.skills-pin', start: 'top top', end: () => '+=' + Math.round(innerHeight * 1.7), pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: s => spin(-s.progress * (360 - step)) });
        const prev = cleanup;
        cleanup = () => { prev?.(); faces.forEach(f => { ['transform', 'opacity', 'filter', 'border-color', 'box-shadow'].forEach(p => f.style.removeProperty(p)); }); ringRot.style.removeProperty('transform'); };
      } else if (!reduce) {
        gsap.from(faces, { y: 40, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ringRot, start: 'top 85%', once: true } });
      }
      if (!reduce) {
        $$('.skills-more .cloud').forEach(cl => gsap.from(cl.children, { rotateX: -80, y: 40, opacity: 0, transformPerspective: 800, transformOrigin: '50% 100%', duration: 0.9, ease: 'power3.out', stagger: { each: 0.035, from: 'random' }, scrollTrigger: { trigger: cl, start: 'top 88%', once: true } }));
        $$('.skills-more .tier > h3').forEach(h => gsap.from(h, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } }));
      }

      /* ----- SERVICES ----- */
      link('skills', 'services', '#services');
      if (!reduce) {
        $$('.tw').forEach(t => gsap.fromTo(t, { rotateX: is3d ? 62 : 20, y: is3d ? 110 : 50, opacity: 0, transformPerspective: 1300 }, { rotateX: 0, y: 0, opacity: 1, ease: 'none', immediateRender: true,
          scrollTrigger: { trigger: t, start: 'top 98%', end: 'top 62%', scrub: 0.6 } }));
      }

      /* ----- ABOUT ----- */
      link('services', 'about', '#about');
      const lit = $('[data-lit]');
      if (lit && !reduce) {
        lit.classList.add('armed');
        const els = $$('.w', lit);
        ScrollTrigger.create({ trigger: lit, start: 'top 85%', end: 'bottom 50%', scrub: true, onUpdate: s => els.forEach((w, i) => w.classList.toggle('on', i / els.length < s.progress * 1.08)) });
        const prev = cleanup;
        cleanup = () => { prev?.(); lit.classList.remove('armed'); els.forEach(w => w.classList.remove('on')); };
      }
      if (!reduce) {
        gsap.from('.facts dt, .facts dd', { x: 40, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.facts', start: 'top 85%', once: true } });
        $$('.stats > div').forEach((d, i) => gsap.from(d, { rotateX: is3d ? -70 : 0, y: 60, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%', duration: 1, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 88%', once: true } }));
      }
      ScrollTrigger.create({ trigger: '.stats', start: 'top 85%', once: true, onEnter: () => markSeen($('.stats')!) });

      /* ----- CONTACT: card must settle well before the end of the page ----- */
      link('about', 'contact', '#contact');
      if (!reduce) {
        gsap.from('#form', { rotateX: is3d ? 24 : 0, y: 80, opacity: 0, transformPerspective: 1200, ease: 'none', scrollTrigger: { trigger: '#form', start: 'top 100%', end: 'top 80%', scrub: 0.6 } });
        gsap.from('.side > div', { x: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.side', start: 'top 88%', once: true } });
        gsap.from('.gi', { rotateX: -90, yPercent: 60, opacity: 0, transformPerspective: 800, transformOrigin: '50% 100%', stagger: 0.04, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.giant', start: 'top 98%', once: true } });
      }
      return () => { cleanup?.(); $$('.stats').forEach(s => s.classList.remove('seen')); };
    });

    /* Re-measure once everything (images, fonts) has settled. */
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('load', refresh);
      gsap.ticker.remove(blend);
      mm.revert();
      delete root.dataset.mode;
    };
  }, []);
}
