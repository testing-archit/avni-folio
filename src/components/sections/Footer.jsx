import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Avni Saini. All rights reserved. <br />
          <span className="text-xs text-slate-600">Designed with React, Three.js & Tailwind</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;