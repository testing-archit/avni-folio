'use client';

import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contact } from '../../data/resume';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p className="footer-credit"><span className="brand-flower" aria-hidden="true" /> © {new Date().getFullYear()} Avni Saini</p>
        <div className="footer-links">
          <Link href="/work">Project index</Link>
          <a href={contact.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          {pathname === '/'
            ? <a href="#home">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a>
            : <Link href="/">Home <ArrowUpRight size={16} aria-hidden="true" /></Link>}
        </div>
      </div>
    </footer>
  );
}
