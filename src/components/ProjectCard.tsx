import { Fragment } from 'react';
import { Counter } from './Counter';
import type { Project } from '../data/projects';

function Pairs({ className, rows }: { className: string; rows: [string, string][] }) {
  return (
    <dl className={className}>
      {rows.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}
    </dl>
  );
}

export function ProjectCard({ project: p, index, total }: { project: Project; index: number; total: number }) {
  const { stat, bars, duo, mini, spec } = p.panel;
  return (
    <article className={`card ${p.cls}`} style={{ '--i': index } as React.CSSProperties} data-reveal>
      <div className="ct">
        <div>
          <div className="kick"><span>Project {index + 1} of {total}</span><span>{p.period}</span></div>
          <h3>{p.name}</h3>
          <p className="d">{p.summary}</p>
          <ul>{p.bullets.map(b => <li key={b}>{b}</li>)}</ul>
        </div>
        <div className="chips">{p.chips.map(c => <span key={c}>{c}</span>)}</div>
      </div>
      <div className="panel">
        {stat && <div className="stat"><b>{stat.value}</b><span>{stat.label}</span></div>}
        {bars && (
          <div>
            {bars.map(b => (
              <div className="vb" key={b.label}>
                <div className="rowt"><span>{b.label}</span><Counter to={b.to} dec={b.dec} unit="KB" /></div>
                <div className="vt"><i className={`vf ${b.fill}`} /></div>
              </div>
            ))}
          </div>
        )}
        {duo && (
          <div className="duo">
            {duo.map(d => <div className="stat" key={d.label}><b>{d.value}</b><span>{d.label}</span></div>)}
          </div>
        )}
        {mini && <Pairs className="mini" rows={mini} />}
        <Pairs className="spec" rows={spec} />
      </div>
    </article>
  );
}
