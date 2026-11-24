import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="about-band" aria-labelledby="about-title">
      <div className="wrap section about-layout">
        <div className="about-signature" aria-hidden="true">
          <span>A<span className="signature-period">.</span></span>
          <span className="brand-flower" />
        </div>
        <div className="about-copy">
          <h2 id="about-title">A little about me.</h2>
          <p>I study computer science and engineering with a specialization in blockchain at Bennett University. On campus, I lead design for the Student Cabinet and serve as General Secretary of the Palletto Club.</p>
          <p>My work spans app identities like Smart Chef, event graphics for ResCon, and digital products like Rail Ledger. I’m drawn to projects where I can shape both how an idea looks and how people use it.</p>
          <Link className="text-link" href="/resume">Read my résumé <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
