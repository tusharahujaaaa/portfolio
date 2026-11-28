import { CONFIG } from '../config';
import { Chars } from './Split';
import { ContactForm } from './ContactForm';

const strip = (u: string) => u.replace(/^https?:\/\/(www\.)?/, '');

export function Contact() {
  return (
    <section className="block wrap" id="contact">
      <div className="sec-head rv">
        <h2 className="title" data-chars aria-label="Let’s talk.">
          <Chars text="Let’s" /> <span className="grad"><Chars text="talk." /></span>
        </h2>
      </div>
      <div className="contact rv">
        <ContactForm />
        <div className="side">
          <div><h3>LinkedIn</h3><a className="big-link" href={CONFIG.linkedin} target="_blank" rel="noopener">{strip(CONFIG.linkedin)}</a><p>The quickest way to reach me today.</p></div>
          <div><h3>Resume</h3><a className="big-link" href={CONFIG.resume} target="_blank" rel="noopener" download="Tushar_Ahuja_Resume.pdf">Download PDF</a><p>Two pages with project details and skills.</p></div>
          {CONFIG.email && <div><h3>Email</h3><a className="big-link" href={'mailto:' + CONFIG.email}>{CONFIG.email}</a></div>}
          {CONFIG.github && <div><h3>GitHub</h3><a className="big-link" href={CONFIG.github} target="_blank" rel="noopener">{strip(CONFIG.github)}</a></div>}
          <div><h3>Working hours</h3><p>Weekdays in Indian Standard Time, with evenings open for freelance calls.</p></div>
        </div>
      </div>
    </section>
  );
}
