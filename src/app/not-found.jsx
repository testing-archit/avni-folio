import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="wrap subpage empty-page" tabIndex={-1}>
      <h1>Page not found.</h1>
      <Link className="button button-primary" href="/#portfolio">Back to work</Link>
    </main>
  );
}
