'use client';

import React, { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { href: '#portfolio', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
];

function SectionLink({ href, children, className, close }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <a className={className} href={href} onClick={close}>{children}</a>;
  }

  return <Link className={className} href={`/${href}`} onClick={close}>{children}</Link>;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const close = () => setOpen(false);

  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) {
      close();
      toggleRef.current?.focus();
    }
  }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <div className="wrap header-inner">
        <SectionLink className="wordmark" href="#home" close={close}>
          <span className="brand-flower" aria-hidden="true" />
          <span>Avni Saini</span>
        </SectionLink>
        <button
          className="menu-toggle icon-button"
          type="button"
          ref={toggleRef}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-navigation"
          aria-expanded={open}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="primary-navigation" className="main-nav" aria-label="Main navigation" data-open={open}>
          {sections.map(({ href, label }) => (
            <SectionLink key={href} href={href} close={close}>{label}</SectionLink>
          ))}
          <Link href="/resume" onClick={close} aria-current={pathname === '/resume' ? 'page' : undefined}>Résumé</Link>
          <SectionLink href="#contact" close={close} className="button button-outline nav-contact">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </SectionLink>
        </nav>
      </div>
    </header>
  );
}
