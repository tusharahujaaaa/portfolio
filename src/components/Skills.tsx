import { ringSkills, alsoUsed, learning } from '../data/content';
import { Chars } from './Split';

export function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-pin">
        <div className="sec-head wrap">
          <h2 className="title" data-chars aria-label="Skills"><Chars text="Skills" /></h2>
          <p className="note">Grouped by how often I actually use them. <span className="only3d"> Scroll to spin the ring.</span></p>
        </div>
        <div className="ring-wrap">
          <div className="ring-rot" id="ringrot">
            {ringSkills.map((s, i) => (
              <div className="face" key={s.name}>
                <i>{String(i + 1).padStart(2, '0')}</i><span>{s.name}</span><small>{s.note}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="skills-more wrap">
        <div className="tier">
          <h3><b>Also used</b> / on projects</h3>
          <div className="cloud">{alsoUsed.map(s => <span key={s}>{s}</span>)}</div>
        </div>
        <div className="tier">
          <h3><b>Learning</b> / right now</h3>
          <div className="cloud dashed">{learning.map(s => <span key={s}>{s}</span>)}</div>
        </div>
      </div>
    </section>
  );
}
