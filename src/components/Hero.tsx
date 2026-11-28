import { Words } from './Split';
import { Pill, ArrowRight, DownloadIcon } from './Pill';
import { useClock } from '../hooks/useClock';
import { CONFIG } from '../config';

const HEADLINE = 'I build interfaces people don’t';

export function Hero() {
  const time = useClock();
  return (
    <section className="hero" id="top">
      <div className="hero-in wrap">
        <p className="status"><span className="dot" aria-hidden="true" /> Open to freelance <span aria-hidden="true">/</span> <span>{time} IST</span></p>
        <h1 aria-label={HEADLINE + ' wait for.'}>
          <Words text={HEADLINE} />{' '}
          <em><Words text="wait for." start={HEADLINE.split(' ').length} /></em>
        </h1>
        <div className="hero-foot">
          <div>
            <p className="sub">I’m Tushar, a software engineer with nearly 4 years building Angular products for EdTech, government, telecom, healthcare and finance. Upgrades, performance and product UI.</p>
            <div className="cta">
              <Pill href="#contact">Start a project <ArrowRight /></Pill>
              <Pill ghost href="#work">See the work</Pill>
              <Pill ghost href={CONFIG.resume} target="_blank" rel="noopener" download="Tushar_Ahuja_Resume.pdf">Resume <DownloadIcon /></Pill>
            </div>
          </div>
          <a className="badge" href="#work" aria-label="Scroll to work">
            <svg className="t" viewBox="0 0 160 160" aria-hidden="true">
              <defs><path id="c" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" /></defs>
              <text><textPath href="#c">Angular • Performance • Upgrades • Product UI • </textPath></text>
            </svg>
            <span className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
