import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AVNI'S Studio
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Home</a>
              <a href="#portfolio" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Portfolio</a>
              <a href="#about" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">About</a>
              <a href="#experience" className="hover:text-purple-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Experience</a>
              <a href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/25">
                Contact Me
              </a>
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
              <a href="#home" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#portfolio" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Portfolio</a>
              <a href="#about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#experience" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Experience</a>
              <a href="#contact" className="text-purple-400 block px-3 py-2 rounded-md text-base font-medium">Contact Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;