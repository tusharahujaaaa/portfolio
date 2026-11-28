import { projects } from '../data/projects';
import { Chars } from './Split';
import { ProjectCard } from './ProjectCard';

export function Work() {
  return (
    <section className="work" id="work">
      <div className="work-head wrap">
        <h2 className="title" data-chars aria-label="Work 06">
          <Chars text="Work" /><sup>{String(projects.length).padStart(2, '0')}</sup>
        </h2>
        <p className="note">Most of this work sits under client or company access, so there are no public links. I can walk you through any of it on a call.</p>
      </div>
      <div className="work-stage">
        {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} total={projects.length} />)}
      </div>
      <div className="work-hud" aria-hidden="true">
        <span className="num"><b id="wnum">01</b> / {String(projects.length).padStart(2, '0')}</span>
        <span className="wbar"><i id="wfill" /></span>
        <span className="hint">Scroll</span>
      </div>
    </section>
  );
}
