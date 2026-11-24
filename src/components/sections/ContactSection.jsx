'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react';
import { contact } from '../../data/resume';

const formEndpoint = 'https://api.web3forms.com/submit';

function getEmailDraft(formData) {
  const name = formData.get('name');
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${formData.get('message')}\n\n${name}\n${formData.get('email')}`);
  return `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

export default function ContactSection({ accessKey }) {
  const canSend = Boolean(accessKey);
  const [status, setStatus] = useState('idle');
  const [draft, setDraft] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const emailDraft = getEmailDraft(formData);

    if (!canSend) {
      window.location.href = emailDraft;
      return;
    }

    setStatus('sending');
    setDraft(emailDraft);
    formData.set('subject', `Portfolio inquiry from ${formData.get('name')}`);
    formData.set('from_name', formData.get('name'));

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact-band" aria-labelledby="contact-title">
      <div className="wrap section contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title">Let’s make<br />something.</h2>
          <p>Have a project in mind? Tell me what you’re working on.</p>
          <a className="contact-email" href={`mailto:${contact.email}`}><Mail size={19} aria-hidden="true" /> {contact.email}</a>
          <div className="social-links">
            <a href={contact.instagram} className="icon-button" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={19} aria-hidden="true" /></a>
            <a href={contact.linkedin} className="icon-button" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} aria-hidden="true" /></a>
          </div>
        </div>
        <form
          className="contact-form"
          action={canSend ? formEndpoint : `mailto:${contact.email}`}
          method="post"
          encType={canSend ? undefined : 'text/plain'}
          onSubmit={handleSubmit}
          aria-label="Contact Avni"
          aria-busy={status === 'sending'}
        >
          {canSend && <input type="hidden" name="access_key" value={accessKey} />}
          <div className="contact-form-fields">
            <label htmlFor="name">Your name<input id="name" name="name" autoComplete="name" placeholder="Name" required maxLength={100} /></label>
            <label htmlFor="email">Your email<input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
          </div>
          <label htmlFor="message">Your message<textarea id="message" name="message" rows={4} placeholder="Tell me a little about your project" required maxLength={3000} /></label>
          <input type="checkbox" name="botcheck" hidden tabIndex={-1} autoComplete="off" />
          <button className="button button-light" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : canSend ? 'Send message' : 'Open email draft'} <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <div className="form-status" role="status">
            {status === 'success' && 'Your message is on its way. Thanks for getting in touch!'}
            {status === 'error' && <>Your message couldn’t be sent. <a href={draft}>Open it in your email app</a> or try again.</>}
          </div>
        </form>
      </div>
    </section>
  );
}
