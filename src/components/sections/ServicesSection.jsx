import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Megaphone, Share2 } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-16">What I Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Brand Identity</h3>
            <p className="text-slate-400">Crafting unique logos and visual systems that define brands, like Smart Chef and Calm Zone.</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Event Marketing</h3>
            <p className="text-slate-400">Designing cohesive collateral for large scale events including posters, banners, and digital displays.</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="p-8 rounded-2xl bg-slate-800/30 border border-white/5">
            <div className="w-16 h-16 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>
            <p className="text-slate-400">Creating engaging content for social platforms to drive engagement and brand awareness.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;