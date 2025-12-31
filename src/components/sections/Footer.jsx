import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Avni Saini</h3>
            <p className="text-slate-400 text-sm">
              Creative Designer specializing in Brand Identity, Event Visuals, and Digital Experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="/#portfolio" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Portfolio
              </a>
              <Link to="/resume" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Resume
              </Link>
              <a href="/#contact" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/avni-saini-0927a12b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/damnitavni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:avnisixc13@gmail.com"
                className="text-slate-400 hover:text-purple-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Avni Saini. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Designed with React, Three.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;