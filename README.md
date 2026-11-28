# Tushar Ahuja — Portfolio (React + Vite + TypeScript)

The Orange 3D portfolio, rebuilt as a React app. Same look, same scroll animations, same EmailJS contact form.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Where things live

```
src/
  config.ts              contact + EmailJS / Formspree settings, email, GitHub, LinkedIn, resume path
  data/
    projects.ts          the 6 work cards (edit text / add a project here)
    content.ts           skills ring, "also used", services, about text, facts, stats, marquee
  components/            one component per section: Hero, Work (ProjectCard), Skills, Services, About,
                         Contact (ContactForm), Footer, Nav + Background (3D), Cursor, Progress
  hooks/
    useChoreography.ts   ALL GSAP / ScrollTrigger scroll animation (pinned work fly-through, skills ring, reveals)
    useClock.ts          IST clock
  lib/
    scene.js             the Three.js orange core (WebGL), plus scene.d.ts types
    smoothScroll.ts      Lenis smooth scroll + #anchor scrolling
  styles/global.css      the original stylesheet, unchanged in behaviour
public/                  resume PDF, favicons, og image
```

## Notes

- Adding a project: add an object to `src/data/projects.ts`. The card layout, counter and the 3D fly-through pick it up automatically (a card with `bars` + `duo` shows the bundle-size bars; otherwise `stat` + `mini`).
- Text that the scroll animation splits (headline words, title characters, the About paragraph, the footer name) is now rendered by React (`Split.tsx`, `About.tsx`, `Footer.tsx`) instead of being rewritten in the DOM.
- Number counters (`Counter.tsx`) are React state; the scroll hook only dispatches a `reveal` event the first time a card / stats row is seen.
- Under 1025px wide, short screens, or `prefers-reduced-motion`, the page switches to a flat layout with simple reveals (handled by `gsap.matchMedia` in `useChoreography.ts`).
- Update the `canonical` / `og:` URLs in `index.html` to your deployed domain.
