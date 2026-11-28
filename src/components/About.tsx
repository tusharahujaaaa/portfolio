import { Fragment } from 'react';
import { aboutLit, aboutLead, facts, stats } from '../data/content';
import { Chars } from './Split';
import { Counter } from './Counter';

export function About() {
  const words = aboutLit.split(/\s+/);
  return (
    <section className="block wrap" id="about">
      <div className="sec-head rv"><h2 className="title" data-chars aria-label="About"><Chars text="About" /></h2></div>
      {/* Words are separate spans so scroll can light them up one by one */}
      <p className="lit" data-lit aria-label={aboutLit}>
        {words.map((w, i) => <Fragment key={i}><span className="w" aria-hidden="true">{w}</span>{i < words.length - 1 ? ' ' : null}</Fragment>)}
      </p>
      <div className="about-grid rv">
        <p>{aboutLead}</p>
        <dl className="facts">{facts.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}</dl>
      </div>
      <div className="stats rv" data-reveal>
        {stats.map(s => <div key={s.label}><Counter to={s.to} dec={s.dec} suffix={s.suffix} /><span>{s.label}</span></div>)}
      </div>
    </section>
  );
}
