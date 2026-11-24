import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-intro"><span className="brand-flower" aria-hidden="true" /> Avni Saini, visual designer</h1>
          <p className="hero-display">Design with<br />feeling.</p>
          <p className="hero-description">
            I design brand identities, event graphics, and digital experiences. I’m also a computer science student.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#portfolio">Explore my work <ArrowDown size={18} aria-hidden="true" /></a>
            <Link className="button button-outline" href="/resume">View résumé <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            <Image src="/profile-image.jpeg" alt="Avni Saini" fill sizes="(max-width: 700px) 70vw, 372px" preload />
          </div>
          <span className="brand-flower portrait-flower" aria-hidden="true" />
          <figcaption>Visual designer <span aria-hidden="true">/</span> Greater Noida, India</figcaption>
        </figure>
      </div>
    </section>
  );
}
