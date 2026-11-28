import { Fragment } from 'react';
import { marquee } from '../data/content';

/** Scrolling tech strip. The group is rendered twice so the CSS loop is seamless. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="trk">
        {[0, 1].map(g => (
          <div className="grp" key={g}>
            {marquee.map(t => <Fragment key={t}><span>{t}</span><i /></Fragment>)}
          </div>
        ))}
      </div>
    </div>
  );
}
