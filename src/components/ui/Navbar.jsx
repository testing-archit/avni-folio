import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const NavLink = ({ href, children, isButton, mobile }) => {
    let to = href;
    if (href.startsWith('#') && !isHome) {
      to = `/${href}`;
    }

    const desktopClass = isButton
      ? "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/25"
      : "hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white";

    const mobileClass = isButton
      ? "text-purple-400 block px-3 py-2 rounded-md text-base font-medium"
      : "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium";

    const className = mobile ? mobileClass : desktopClass;

    if (href.startsWith('#') && isHome) {
      return (
        <a href={href} className={className} onClick={() => setIsOpen(false)}>
          {children}
        </a>
      );
    }

    return (
      <Link to={to} className={className} onClick={() => setIsOpen(false)}>
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AVNI'S Studio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#portfolio">Portfolio</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <Link to="/resume" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">
                Resume
              </Link>
              <NavLink href="#contact" isButton>
                Contact Me
              </NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="#home" mobile>Home</NavLink>
              <NavLink href="#portfolio" mobile>Portfolio</NavLink>
              <NavLink href="#about" mobile>About</NavLink>
              <NavLink href="#experience" mobile>Experience</NavLink>
              <Link
                to="/resume"
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Resume
              </Link>
              <NavLink href="#contact" mobile isButton>Contact Me</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;