import React from 'react';
import localFont from 'next/font/local';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/sections/Footer';
import { isPreview, siteDescription, siteTitle, siteUrl } from '../data/site';
import './globals.css';

const display = localFont({
  src: './fonts/bricolage-grotesque.woff2',
  variable: '--display-font',
  weight: '400 800',
  display: 'swap',
});

const body = localFont({
  src: './fonts/dm-sans.woff2',
  variable: '--body-font',
  weight: '400 700',
  display: 'swap',
});

export const metadata = {
  metadataBase: siteUrl,
  title: { default: `${siteTitle} | Visual Designer`, template: `%s | ${siteTitle}` },
  description: siteDescription,
  icons: { icon: { url: '/favicon.png', type: 'image/png' } },
  robots: isPreview ? { index: false, follow: false } : undefined,
};

export const viewport = { themeColor: '#fcf9f5' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
