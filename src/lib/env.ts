/** Media-query flags, read once on load (client-only app). */
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
export const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
