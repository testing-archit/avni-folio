import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="about-band" aria-labelledby="about-title">
      <div className="wrap section about-layout">
        <div className="about-portraits">
          <Image src="/images/avni/sunflower.webp" alt="Avni holding a sunflower on a lawn" width={900} height={1200} sizes="(max-width: 700px) 48vw, 290px" />
          <Image src="/images/avni/garden.webp" alt="Avni outdoors in a striped sweater" width={900} height={1200} sizes="(max-width: 700px) 40vw, 235px" />
          <Image src="/images/avni/candid-portrait.webp" alt="Avni smiling during a car ride" width={575} height={770} sizes="(max-width: 700px) 40vw, 235px" />
        </div>
        <div className="about-copy">
          <h2 id="about-title">A little about me.</h2>
          <p>I study computer science and engineering with a specialization in blockchain at Bennett University. On campus, I lead design for the Student Cabinet and serve as General Secretary of the Palletto Club.</p>
          <p>My work spans app identities like <Link href="/project/smart-chef">Smart Chef</Link>, event graphics for <Link href="/project/rescon-4-0">ResCon</Link>, and digital products like <Link href="/project/rail-ledger">Rail Ledger</Link>. I’m drawn to projects where I can shape both how an idea looks and how people use it.</p>
          <Link className="text-link" href="/resume">Read my résumé <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
