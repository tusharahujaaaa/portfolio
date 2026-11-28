import { Fragment } from 'react';

/** Hero headline: each word rises inside its own mask (CSS animation, --i = stagger index). */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(/\s+/).map((w, i, a) => (
        <Fragment key={i}>
          <span className="sw"><span className="si" style={{ '--i': start + i } as React.CSSProperties}>{w}</span></span>
          {i < a.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

/** Section titles: every character is its own span so GSAP can flip them in. */
export function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split(/\s+/).map((w, i, a) => (
        <Fragment key={i}>
          <span className="wd" aria-hidden="true">
            {[...w].map((c, j) => <span className="ch" key={j}>{c}</span>)}
          </span>
          {i < a.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
