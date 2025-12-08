import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

import { HeroScene } from '../3d';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroScene />
      </Suspense>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Avni Saini</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
              A Creative Designer specializing in Brand Identity, Event Visuals, and Digital Experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                See My Work
              </a>
              <a href="#contact" className="px-8 py-3 border border-white/30 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                Contact Me
              </a>
            </div>
          </motion.div>
          {/* The 3D element acts as the visual interest on the right for desktop, 
              but we keep text readable by positioning it on the left. */}
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;