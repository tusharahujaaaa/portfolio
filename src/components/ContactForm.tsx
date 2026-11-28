import { useState, type FormEvent } from 'react';
import { CONFIG } from '../config';
import { Pill } from './Pill';

interface Fields { name: string; email: string; subject: string; org: string; msg: string; company: string }
const EMPTY: Fields = { name: '', email: '', subject: '', org: '', msg: '', company: '' };
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'msg', string>>;

function validate(d: Fields): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = 'Add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Enter an email I can reply to.';
  if (!d.subject.trim()) e.subject = 'Add a short subject.';
  if (d.msg.trim().length < 10) e.msg = 'Add a few words so I know how to help.';
  return e;
}

async function deliver(d: Fields): Promise<{ sent: boolean; configured: boolean }> {
  const ej = CONFIG.emailjs;
  const useEmailJS = !!(ej.serviceId && ej.templateId && ej.publicKey);
  try {
    if (useEmailJS) {
      const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: ej.serviceId, template_id: ej.templateId, user_id: ej.publicKey, template_params: { from_name: d.name, from_email: d.email, company: d.org || '-', subject: d.subject, message: d.msg } })
      });
      return { sent: r.ok, configured: true };
    }
    if (CONFIG.endpoint) {
      const r = await fetch(CONFIG.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: `${d.subject} (from ${d.name})`, name: d.name, email: d.email, company: d.org, subject: d.subject, message: d.msg })
      });
      return { sent: r.ok, configured: true };
    }
  } catch { /* fall through to the manual fallback */ }
  return { sent: false, configured: useEmailJS || !!CONFIG.endpoint };
}

export function ContactForm() {
  const [v, setV] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV(prev => ({ ...prev, [k]: e.target.value }));
    if (k in errors) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setFallback(null); setStatus('');
    if (v.company) return; // honeypot
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus('Please fix the fields marked above.'); return; }
    setDraft(`Name: ${v.name}\nEmail: ${v.email}\nCompany: ${v.org || '-'}\nSubject: ${v.subject}\n\n${v.msg}`);
    setSending(true);
    const { sent, configured } = await deliver(v);
    setSending(false);
    if (sent) {
      setStatus(`Thanks, ${v.name.trim().split(' ')[0]}. Your message has been sent and I will reply to ${v.email.trim()}.`);
      setV(EMPTY);
    } else {
      setFallback((configured ? 'The message did not go through. ' : 'This page cannot deliver messages yet. ') + 'Copy it and send it to me on LinkedIn' + (CONFIG.email ? ` or at ${CONFIG.email}` : '') + '.');
    }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setStatus('Message copied.'); }
    catch { setStatus('Copy is blocked here. Select your text in the form and copy it by hand.'); }
  }

  const field = (id: keyof Errors) => ({ id, name: id, value: v[id], onChange: set(id), 'aria-invalid': !!errors[id] });

  return (
    <form id="form" noValidate onSubmit={onSubmit}>
      <div className="two">
        <div className="f"><label htmlFor="name">Your name</label><input {...field('name')} autoComplete="name" required /><span className="err" id="e-name">{errors.name}</span></div>
        <div className="f"><label htmlFor="email">Email</label><input {...field('email')} type="email" autoComplete="email" required /><span className="err" id="e-email">{errors.email}</span></div>
      </div>
      <div className="two">
        <div className="f"><label htmlFor="subject">Subject</label><input {...field('subject')} placeholder="Project, job opening, question" required /><span className="err" id="e-subject">{errors.subject}</span></div>
        <div className="f"><label htmlFor="org">Company <span className="opt">(optional)</span></label><input id="org" name="org" value={v.org} onChange={set('org')} autoComplete="organization" /></div>
      </div>
      <div className="f"><label htmlFor="msg">Message</label><textarea id="msg" name="msg" value={v.msg} onChange={set('msg')} aria-invalid={!!errors.msg} required placeholder="Tell me about the project, the role or your question." /><span className="err" id="e-msg">{errors.msg}</span></div>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.company} onChange={set('company')} />
      <div className="submit-row">
        <button className="pill mag" type="submit" id="send" disabled={sending}>{sending ? 'Sending' : 'Send message'}</button>
        <p className="status-msg" id="status" role="status" aria-live="polite">{status}</p>
      </div>
      {fallback && (
        <div className="fallback" id="fallback">
          <p>{fallback}</p>
          <div className="cta" style={{ margin: 0 }}>
            <button className="pill ghost" type="button" onClick={copy}>Copy my message</button>
            <Pill ghost magnetic={false} href={CONFIG.linkedin} target="_blank" rel="noopener">Message on LinkedIn</Pill>
          </div>
        </div>
      )}
    </form>
  );
}
