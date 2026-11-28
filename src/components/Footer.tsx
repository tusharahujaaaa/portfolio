import { useEffect, useRef } from 'react';
import { useClock } from '../hooks/useClock';

const NAME = 'TUSHAR AHUJA';

export function Footer() {
  const time = useClock();
  const giant = useRef<HTMLDivElement>(null);

  /* Scale the giant outlined name so it always spans the page width. */
  useEffect(() => {
    const el = giant.current!;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = (el.firstElementChild as HTMLElement).getBoundingClientRect().width;
      el.style.fontSize = (100 * (el.clientWidth - innerWidth * 0.04)) / w + 'px';
    };
    fit();
    addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => removeEventListener('resize', fit);
  }, []);

  return (
    <footer>
      <div className="wrap"><div className="foot"><span>Tushar Ahuja / Noida, India</span><span>Local time in Noida {time} IST</span><a href="#top">Back to top</a></div></div>
      <div className="giant" aria-hidden="true" ref={giant}>
        <span style={{ display: 'inline-block' }}>
          {[...NAME].map((c, i) => <span className="gi" key={i}>{c === ' ' ? ' ' : c}</span>)}
        </span>
      </div>
    </footer>
  );
}
